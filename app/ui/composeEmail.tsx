'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import ReactSelect from "@/app/ui/reactSelect";
import Textarea from '@/app/ui/textarea';

import { useEffect, useState } from "react";

import { getEmailTemplates } from "@/app/(admin)/emails/actions";


interface Props {

  data: any;
  functions: any;

  initialEmailForm?: {
    id?: number,
    template?: string,
    subject?: string,
    body?: string,
    statuses?: string,
    schedule?: string,
  }
}


const ComposeEmail: React.FC<Props> = ({ data, functions, initialEmailForm, }) => {

  const { lead, company, heading } = data;
  const { save, setAlert, closeModal } = functions;

  const [emailForm, setEmailForm] = useState(initialEmailForm);
  const [emailTemplateOptions, setEmailTempateOptions] = useState([]);

  useEffect(() => {
    getEmailTemplates().then(results => {
      let newResults: any = [...results.map((result: any) => ({ ...result, label: result.name, value: result.name }))]
      if (results && results.length) setEmailTempateOptions(newResults)
    });
  }, [])

  const handleSubmit = async () => {
    const response = await save(emailForm);
    if (response?.status === 201 || response?.status === 200) {
      setAlert(`Email ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      // refreshRecords();
    };
  }

  return (
    <Modal heading={heading} closeModal={closeModal} >

      <form action={handleSubmit}>

        <input type="hidden" value={emailForm?.id} />

        <ReactSelect
          label="email template"
          onChange={(value: any) => setEmailForm({ ...emailForm, subject: value.subject, body: value.body })}
          options={emailTemplateOptions}
        />

        <Input type="text" label="subject" value={emailForm?.subject || ""}
          onChange={(e: any) => setEmailForm({ ...emailForm, subject: e.target.value })}
        />

        <Textarea label='body' value={emailForm?.body || ""}
          onChange={(e: any) => setEmailForm({ ...emailForm, body: e.target.value })}
        />

        <Input type="datetime-local" label="schedule" value={emailForm?.schedule || ""}
          onChange={(e: any) => setEmailForm({ ...emailForm, schedule: e.target.value })}
        />


        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default ComposeEmail;