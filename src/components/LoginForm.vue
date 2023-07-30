<template>
    <VCard>
        <VCardTitle>
            {{ currStep.msg }}
        </VCardTitle>
        <VWindow v-model='currStep.stepName' v-on:keydown="($event: KeyboardEvent) => handleKeyPress($event)">
            <VWindowItem :value="'init'">
                <OncoTextBox label='Username' v-model='username' ref='txtUsername'/>
                <OncoErrorText :error-msg="initError" style="padding-left: 1rem"/>
            </VWindowItem>
            <VWindowItem :value="'password'">
                <OncoTextBox label='Password' v-model='password' password ref='txtPassword'/>
                <OncoErrorText :error-msg="pwdError" style="padding-left: 1rem"/>
            </VWindowItem>
            <VWindowItem :value="'mfa'">
                <OncoTextBox label='MFA Token' v-model='mfaToken' ref='txtMfaToken'/>
            </VWindowItem>
            <VWindowItem :value="'saml-init'">
                <p tabindex=1 style='padding:2em'>Upon clicking next you will be redirected to your facility's login page.
                    Once you are successfully logged in to your facility's network you will be redirected
                to this login page to finish the login process.</p>
            </VWindowItem>
            <VWindowItem :value="'saml-fail'">
                <OncoErrorText error-msg = 'Something went wrong during the login process and you are not logged in.' style="padding-left: 1rem"/>
            </VWindowItem>
        </VWindow>
        <VCardActions>
            <OncoButton ref='btnBack' label='Back' v-show='currStep.prevStepName != null' @click='goToPrevStep'/>
            <VSpacer/>
            <OncoButton ref='btnNext' label='Next' @click='goToNextStep'/>
        </VCardActions>
    </VCard>
</template>

<script lang='ts' setup>
import { ref, onMounted, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { UserLogonConfig } from '@onco-monorepo/dbaccess/dist/onco-api-types';
import { oncodb } from '@onco-monorepo/dbaccess';
import { onco } from '@onco-monorepo/globals';

import type { LoginStepName } from '@/types/LoginFormTypes';
import { loginSteps } from '@/types/LoginFormTypes';

import OncoTextBox from '@/components/OncoTextBox.vue';
import OncoButton from '@/components/OncoButton.vue';
import OncoErrorText from '@/components/OncoErrorText.vue'

const props = defineProps({loginType: {type: String as PropType<"web" | "desktop">, required: true }});
const router = useRouter();
const route = useRoute();

onMounted(() => { txtUsername.value?.focus(); });

const userDetails = ref<UserLogonConfig | null>(null);

const username = ref('');
const password = ref('');
const mfaToken = ref('')

const initError = ref('');
const pwdError = ref('');
const mfaError = ref('');

const txtUsername = ref<typeof OncoTextBox>();
const txtPassword = ref<typeof OncoTextBox>();
const txtMfaToken = ref<typeof OncoTextBox>();
const txtBoxes: {[key: string]: typeof txtUsername} = { txtUsername, txtPassword, txtMfaToken };

const btnBack = ref<typeof OncoButton>();
const btnNext = ref<typeof OncoButton>();

const currStep = ref(loginSteps['init']);

/* If the user is already logged in, we can skip straight to the end. Additionally,
 * we check if this component was loaded as part of a SAML event that has either
 * succeeded or failed and skip ahead to the correct login step.
 */
const samlResponse = getSamlResponse();

if(oncodb.isLoggedIn())
    proceedWithSuccessfulLogin();
else if (samlResponse != null)
    handleSamlResponse(samlResponse);

function getSamlResponse() : null | "1" | "0" {
    if(onco.isPropDefined(route.query, "samlStatus")
        && route.query.samlStatus != null
        && typeof route.query.samlStatus === "string")  {

        if(route.query.samlStatus === "1")
            return "1";
        else
            return "0";
    }

    return null;
}

async function handleInitStep() : Promise<void> {
    const logonResult = await oncodb.auth.getAuthSettingsForLogin(username.value);

    if(logonResult.success) {
        initError.value = '';
        pwdError.value = '';
        mfaError.value = '';

        userDetails.value = logonResult.output;

        if(logonResult.output.authType === 'pwd')
            changeStep('password');
        else if(logonResult.output.authType === 'saml')
            changeStep('saml-init');
        else
            initError.value = 'User account is disabled or cannot be found'
    } else {
        initError.value = logonResult.error;
        userDetails.value = null;
    }
}

function handleKeyPress(event: KeyboardEvent) : void {
    if(event.key === 'Enter')
        goToNextStep();
    else if(event.key === 'Escape')
        goToPrevStep();
}

async function handlePasswordStep() : Promise<void> {
    const signOnResult = await oncodb.auth.passwordLogin(username.value, password.value);

    if(signOnResult.success) {
        pwdError.value = '';
        mfaError.value = '';

        proceedWithSuccessfulLogin();
    } else {
        if(signOnResult.needsMfa)
            changeStep('mfa');
        else
            pwdError.value = signOnResult?.message ?? 'Unable to sign on with this account.';
    }
}

async function handlePasswordMfaStep() : Promise<void> {
    const signOnResult = await oncodb.auth.passwordAndMfaLogin(username.value, password.value, mfaToken.value);

    if(signOnResult.success) {
        mfaError.value = '';
        proceedWithSuccessfulLogin();
    } else {
        mfaError.value = signOnResult?.message ?? 'Unable to sign on with this account.';
    }
}

async function goToNextStep() : Promise<void> {
    const stepName = currStep.value.stepName;

    if(stepName === 'init') {
        await handleInitStep();
    } else if (stepName === 'password') {
        await handlePasswordStep();
    } else if (stepName === 'mfa') {
        await handlePasswordMfaStep();
    } else if (stepName === 'saml-init') {
        //In theory, this should only ever be non-null, but just in case.
        if(userDetails.value != null) {
            const samlLoginPath = oncodb.auth.startSAMLLogin(userDetails.value, props.loginType);
            window.location.href = samlLoginPath;
        }
        else
            goToPrevStep();
    } else if (stepName === 'saml-fail') {
        changeStep('init');
        router.replace({query: undefined});
    } else {
        throw `Unknown login step ${stepName}`;
    }
}

function proceedWithSuccessfulLogin() : void {
    if(props.loginType === 'desktop')
        router.push({name: "DesktopLoginSuccess"});
    else if(props.loginType === 'web')
        router.push({name: "WebLoginSuccess"}); //This is placeholder -- probably will need more advanced logic!
    else
        throw 'Unknown login type ☹️';
}

async function handleSamlResponse(samlResponse: "0" | "1") : Promise<void> {
    if(samlResponse !== "1") {
        changeStep('saml-fail');
        return;
    }

    const loginRes = await oncodb.auth.finishSAMLLogin()

    if(!loginRes)
        changeStep('saml-fail')
    else
        proceedWithSuccessfulLogin();
}

function goToPrevStep() : void {
    changeStep(currStep.value.prevStepName);
}

function changeStep(newStepName: LoginStepName) : void {
    if(newStepName == null)
        return;

    const newStep = loginSteps[newStepName];

    currStep.value = newStep;

    //I'm not entirely sure why, but it seems like this delay
    //is necessary for this functionality to work properly
    //this is confirmed by my internet searches
    //would be nice to get rid of it though!
    setTimeout(() => {
        if(currStep.value.focusCtl != null) {
            if(currStep.value.focusCtl === 'btnNext')
                btnNext?.value?.focus();
            else if(currStep.value.focusCtl === 'btnBack')
                btnBack?.value?.focus();
            else
                txtBoxes[currStep.value.focusCtl].value?.focus();
        }
    })
}

</script>
