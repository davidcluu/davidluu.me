import type {
  ComponentType,
  FormEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import type { Theme } from '@emotion/react';

import { useRef } from 'react';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { useForm, ValidationError } from '@formspree/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ReactTextareaAutosize from 'react-textarea-autosize';

import formConfig from '../../../../formspree.json';

const FORM_KEY = 'contact';
const FORM_CONFIG = formConfig.forms[FORM_KEY];

interface FormFieldConfig {
  name: string;
  type: string;
  required: boolean;
}

interface FormFieldTextConfig extends FormFieldConfig {
  min: number;
  max: number;
}

interface FormFieldEmailConfig extends FormFieldConfig {}

function getFieldConfig<T extends FormFieldConfig>(name: string): T {
  return {
    name,
    ...FORM_CONFIG.fields[name],
  };
}

const NAME_FIELD_CONFIG: FormFieldTextConfig = getFieldConfig('name');
const EMAIL_FIELD_CONFIG: FormFieldEmailConfig = getFieldConfig('email');
const MESSAGE_FIELD_CONFIG: FormFieldTextConfig = getFieldConfig('message');

const Form = styled.form`
  margin: 0;
  border: none;
  padding: 0;
`;

interface FieldProps {
  label: string;
  name: string;
  type: string;
}

type GenericTextInputProps<P> = P &
  FieldProps & { InputComponent: ComponentType<P>; maxCharacters?: number };

function GenericTextInput<P>({
  label,
  InputComponent,
  maxCharacters,
  ...props
}: GenericTextInputProps<P>) {
  const [field, meta] = useField(props);
  const {
    value: { length },
    touched,
    error,
  } = meta;

  return (
    <div>
      {/* @ts-ignore */}
      <InputComponent
        {...field}
        id={props.name}
        placeholder={label}
        {...props}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={({ utils }) => css`
            ${utils.getThemeVariantCSSWithFallback(
              'color',
              'landing.form.errorMessage.color'
            )}
          `}
        >
          {touched && error && `🚨 ${error} 🚨`}
        </div>
        <div
          css={({ utils }) => css`
            ${utils.getThemeVariantCSSWithFallback(
              'color',
              'landing.font-color'
            )}

            ${touched &&
            maxCharacters &&
            (length === 0 || length > maxCharacters) &&
            utils.getThemeVariantCSSWithFallback(
              'color',
              'landing.form.errorMessage.color'
            )}

            ${!maxCharacters && { userSelect: 'none', color: 'transparent' }}
          `}
        >
          {maxCharacters ? `${length} / ${maxCharacters}` : '¯\\_(ツ)_/¯'}
        </div>
      </div>
    </div>
  );
}

const genericTextInputStyles = ({ utils }: Theme) => css`
  margin: 1em 0 0.5em;
  border: 1px solid transparent;
  border-radius: 0.25em;
  padding: 1em;
  width: 100%;

  transition: all 0.5s;

  ${utils.getThemeVariantCSSWithFallback(
    'background-color',
    'landing.evenIndexedContent.background-color'
  )}
  ${utils.getThemeVariantCSSWithFallback('color', 'landing.font-color')}

  &:hover {
    border: 1px solid gray;
  }

  &:focus {
    border: 1px solid black;

    outline: none;
  }
`;

interface TextInputProps
  extends Omit<
    GenericTextInputProps<InputHTMLAttributes<HTMLInputElement>>,
    'InputComponent'
  > {}

const Input = styled.input`
  ${({ theme }) => genericTextInputStyles(theme)}
`;

const TextInput = (props: TextInputProps) => (
  <GenericTextInput InputComponent={Input} {...props} />
);

interface TextareaInputProps
  extends Omit<
    GenericTextInputProps<TextareaHTMLAttributes<HTMLTextAreaElement>>,
    'InputComponent'
  > {}

const Textarea = ({ rows = 1, ...props }) => (
  <ReactTextareaAutosize
    css={(theme) => css`
      ${genericTextInputStyles(theme)}

      resize: none;
    `}
    minRows={rows}
    {...props}
  />
);

const TextareaInput = (props: TextareaInputProps) => (
  <GenericTextInput InputComponent={Textarea} {...props} />
);

interface SubmitButtonProps {
  disabled?: boolean;
}

const buttonPositioningCss = ({ utils }) => css`
  margin: 1em 0 0;
  border: 0;
  border-radius: 0.25em;
  padding: 0.5em 2em;

  text-align: center;
  font-size: 1.1em;
  ${utils.getBodyFontCSSWithFallback('bold')}
`;

const SubmitButton = ({ disabled = false }: SubmitButtonProps) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    <button
      css={(theme) =>
        css`
          ${buttonPositioningCss(theme)}

          cursor: pointer;
          outline: none;

          ${theme.utils.getThemeVariantCSSWithFallback(
            'background-color',
            'landing.form.submitButton.background-color'
          )}
          ${theme.utils.getThemeVariantCSSWithFallback(
            'color',
            'landing.form.submitButton.color'
          )}

          transition: all 0.5s;

          &:hover {
            ${theme.utils.getThemeVariantCSSWithFallback(
              'background-color',
              'landing.form.submitButton.hover.background-color'
            )}
            ${theme.utils.getThemeVariantCSSWithFallback(
              'color',
              'landing.form.submitButton.hover.color'
            )}
          }
        `
      }
      type="submit"
      disabled={disabled}
    >
      Send Message
    </button>
  </div>
);

const ContactForm = () => {
  const submitEventRef = useRef<FormEvent<HTMLFormElement>>();
  const [
    {
      submitting: submittingToFormspree,
      succeeded: successfullySubmittedToFormspree,
      errors: formspreeErrors,
    },
    submitToFormspree,
  ] = useForm(FORM_KEY);

  return (
    <Formik
      initialValues={{
        [NAME_FIELD_CONFIG.name]: '',
        [EMAIL_FIELD_CONFIG.name]: '',
        [MESSAGE_FIELD_CONFIG.name]: '',
      }}
      validationSchema={Yup.object({
        [NAME_FIELD_CONFIG.name]: Yup.string()
          .max(
            NAME_FIELD_CONFIG.max,
            `Must be ${NAME_FIELD_CONFIG.max} character or less`
          )
          .required('A valid name must be provided'),
        [EMAIL_FIELD_CONFIG.name]: Yup.string()
          .email('Invalid email address')
          .required('A valid email must be provided'),
        [MESSAGE_FIELD_CONFIG.name]: Yup.string()
          .max(
            MESSAGE_FIELD_CONFIG.max,
            `Must be ${MESSAGE_FIELD_CONFIG.max} character or less`
          )
          .required('A valid message must be provided'),
      })}
      onSubmit={async () => {
        await submitToFormspree(
          submitEventRef.current as FormEvent<HTMLFormElement>
        );

        submitEventRef.current = undefined;
      }}
    >
      {({ handleReset, handleSubmit }) => (
        <Form
          onReset={handleReset}
          onSubmit={(event) => {
            submitEventRef.current = event;
            handleSubmit(event);
          }}
          action="#"
        >
          <TextInput
            label="Name"
            name={NAME_FIELD_CONFIG.name}
            type={NAME_FIELD_CONFIG.type}
            maxCharacters={NAME_FIELD_CONFIG.max}
          />

          <TextInput
            label="Email"
            name={EMAIL_FIELD_CONFIG.name}
            type={EMAIL_FIELD_CONFIG.type}
          />

          <TextareaInput
            label="Message"
            name={MESSAGE_FIELD_CONFIG.name}
            type={MESSAGE_FIELD_CONFIG.type}
            maxCharacters={MESSAGE_FIELD_CONFIG.max}
            rows={10}
            autoComplete="off"
          />

          {successfullySubmittedToFormspree ? (
            <div
              css={(theme) => css`
                ${buttonPositioningCss(theme)}
              `}
            >
              Thank you for your message!
            </div>
          ) : (
            <SubmitButton disabled={submittingToFormspree} />
          )}

          <ValidationError
            css={({ utils }) => css`
              margin: 1em 0 0;

              ${utils.getBodyFontCSSWithFallback('bold')}
              ${utils.getThemeVariantCSSWithFallback(
                'color',
                'landing.form.errorMessage.color'
              )}
            `}
            prefix="Form submission error: "
            errors={formspreeErrors}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
