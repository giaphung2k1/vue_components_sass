export type LoginStepName = 'init' | 'password' | 'mfa' | 'saml-init' | 'saml-fail' | null;

type LoginMapped<T> = {[Property in keyof T] : T[Property]; };

/**
 * Contains detail about each step of the login process
 */
type LoginStepInfo = {
    /**
     * A simple description of this login step to display to the user.
     */
    msg: string,
    /**
     * The programmatic name of this step.
     */
    stepName: LoginStepName,
    /**
     * The programmtic name of the step to attach the back button to.
     */
    prevStepName: LoginStepName,
    /**
     * An optional control to focus input on.
     */
    focusCtl: string | null
};

export type LoginStep = {
    'init': LoginStepInfo,
    'password': LoginStepInfo,
    'mfa': LoginStepInfo,
    'saml-init': LoginStepInfo,
    'saml-fail': LoginStepInfo
};

//Not really a type, but it seems somewhat fitting ot include this here?
export const loginSteps: LoginMapped<LoginStep> = {
    'init': {
        msg: 'Enter your username:',
        stepName: 'init',
        prevStepName: null,
        focusCtl: 'txtUsername'
    },
    'password': {
        msg: 'Enter your password:',
        stepName: 'password',
        prevStepName: 'init',
        focusCtl: 'txtPassword'
    },
    'mfa': {
        msg: 'Enter your MFA token:',
        stepName: 'mfa',
        prevStepName: 'password',
        focusCtl: 'txtMfaToken'
    },
    'saml-init': {
        msg: 'Federated login, click next when ready!',
        stepName: 'saml-init',
        prevStepName: 'init',
        focusCtl: 'btnNext'
    },
    'saml-fail': {
        msg: 'Federated login failure.',
        stepName: 'saml-fail',
        prevStepName: null,
        focusCtl: 'btnNext'
    }
};
