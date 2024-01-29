'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import ReactSelect from "@/app/ui/reactSelect";
import ReactMultiSelect from "@/app/ui/reactMultiSelect";

import { saveEmail } from "./actions";
import Textarea from '@/app/ui/textarea';
import Heading from "@/app/ui/heading";
import { useEffect, useState } from "react";

import { convertFiltersToQuery } from '@/app/functions';
import { defaultFilters } from '@/app/constants';
import { searchCompanies } from '@/app/(admin)/companies/actions';


interface Props {

  heading: string;
  closeModal: any;
  refreshEmails: any;
  setEmailForm: any;
  setAlert?: any;
  statusOptions?: any;

  emailForm?: {
    id?: number,
    name?: string,
    subject?: string,
    body?: string,
    statuses?: string,
    notes?: string,
  }
}


const Form: React.FC<Props> = ({ heading, emailForm, setEmailForm, closeModal, refreshEmails, setAlert, statusOptions }) => {


  const handleSubmit = async () => {
    const response = await saveEmail(emailForm);
    if (response?.status === 201 || response?.status === 200) {
      setAlert(`Email ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      refreshEmails();
    };
  }

  return (
    <Modal heading={heading} closeModal={closeModal} >

      <form action={handleSubmit}>

        <input type="hidden" value={emailForm?.id} />

        <Input type="text" label="name" value={emailForm?.name}
          onChange={(e: any) => setEmailForm({ ...emailForm, name: e.target.value })}
        />

        <Input type="text" label="subject" value={emailForm?.subject}
          onChange={(e: any) => setEmailForm({ ...emailForm, subject: e.target.value })}
        />

        <Textarea label='body' rows={20} value={emailForm?.body}
          onChange={(e: any) => setEmailForm({ ...emailForm, body: e.target.value })}
        />

        <ReactMultiSelect
          label="statuses"
          onChange={(value: any) => setEmailForm({ ...emailForm, statuses: value })}
          defaultValues={emailForm?.statuses}
          options={statusOptions}
        />

        <Textarea name='notes' label='notes' value={emailForm?.notes}
          onChange={(e: any) => setEmailForm({ ...emailForm, notes: e.target.value })}
        />

        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default Form;