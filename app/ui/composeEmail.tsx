'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import ReactSelect from "@/app/ui/reactSelect";
import Textarea from '@/app/ui/textarea';

import { useEffect, useState } from "react";

import { getEmailTemplates } from "@/app/(admin)/emails/actions";
import Heading from "./heading";


interface Props {
  data: any;
  functions: any;
}


const initialComposeEmailForm: any = {}
const initialEmailTemplate: any = {}

const ComposeEmail: React.FC<Props> = ({ data, functions, }) => {

  const { leadForm, companyForm, alert, composeEmailModal } = data;
  const { save, setAlert, setComposeEmailModal } = functions;

  const [composeEmailForm, setComposeEmailForm] = useState(initialComposeEmailForm);
  const [emailTemplate, setEmailTemplate] = useState(initialEmailTemplate);

  const [emailTemplateOptions, setEmailTempateOptions] = useState([]);

  useEffect(() => {
    getEmailTemplates().then(results => {
      let newResults: any = [...results.map((result: any) => ({ ...result, label: result.name, value: result.name }))]
      if (results && results.length) setEmailTempateOptions(newResults)
    });
  }, [])


  const replaceBodyEntities = (inputText: any) => {

    const name = leadForm ? leadForm.firstName + " " + leadForm.lastName : companyForm ? companyForm.name : " ";
    const companyName = leadForm && leadForm.company ? "at " + leadForm.company.name : " ";
    return inputText.replace(/\[name\]/g, name).replace(/\[company\]/g, companyName);

  }

  const replacePositionEntities = (inputText: any, value: any) => {
    return inputText.replace(/\[position\]/g, value)
  }

  const handleSubmit = async () => {
    const response = await save(composeEmailForm);
    if (response?.status === 201 || response?.status === 200) {
      setAlert({ ...alert, message: `Compose Email ${response?.status === 200 ? 'Updated' : response.message}`, isMount: true })
      setComposeEmailModal({ ...composeEmailModal, isMount: false })
    };
  }

  return (
    <Modal heading={composeEmailModal.heading} closeModal={() => setComposeEmailModal({ ...composeEmailModal, isMount: false })} >

      <form action={handleSubmit}>

        <input type="hidden" value={composeEmailForm?.id} />

        <Heading label="Cofiguration" />

        <ReactSelect
          label="email template"
          onChange={(value: any) => {
            setComposeEmailForm({
              ...composeEmailForm,
              subject: value.subject,
              body: value.body && replaceBodyEntities(value.body)
            })
            setEmailTemplate({ subject: value.subject, body: value.body && replaceBodyEntities(value.body) })
          }

          }
          options={emailTemplateOptions}
        />

        <Input type="text" label="position" value={composeEmailForm?.position || ""}
          onChange={(e: any) => setComposeEmailForm({
            ...composeEmailForm,
            position: e.target.value,
            subject: replacePositionEntities(emailTemplate.subject, e.target.value),
            body: replacePositionEntities(emailTemplate.body, e.target.value),
          })}
        />

        <Input type="datetime-local" label="schedule" value={composeEmailForm?.schedule || ""}
          onChange={(e: any) => setComposeEmailForm({ ...composeEmailForm, schedule: e.target.value })}
        />


        <Heading label="Email" />

        <Input type="text" label="subject" value={composeEmailForm?.subject || ""}
          onChange={(e: any) => setComposeEmailForm({ ...composeEmailForm, subject: e.target.value })}
        />

        <Textarea label='body' rows={20} value={composeEmailForm?.body || ""}
          onChange={(e: any) => setComposeEmailForm({ ...composeEmailForm, body: e.target.value })}
        />


        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default ComposeEmail;