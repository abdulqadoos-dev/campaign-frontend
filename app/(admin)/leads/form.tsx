'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import ReactSelect from "@/app/ui/reactSelect";

import { saveLead } from "./actions";

import { useEffect, useState } from "react";
import Textarea from '@/app/ui/textarea';
import { LEADS } from '@/app/constants';
import { getStatusesByType } from '../statuses/actions';

interface Props {

  heading: string;
  closeModal: any;
  refreshLeads: any;
  setLeadForm: any;
  setResponse?: any;
  leadForm?: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    url?: string,
    status?: string,
    notes?: string,
    address?: string,
    designation?: string
  }
}


const Form: React.FC<Props> = ({ heading, leadForm, setLeadForm, closeModal, refreshLeads, setResponse }) => {

  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    getStatusesByType(LEADS).then(result => {
      if (result) setStatusOptions(result)
    });
  }, [])


  const handleSubmit = async () => {
    const response = await saveLead(leadForm);
    if (response?.status === 201 || response?.status === 200) {
      setResponse(`Lead ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      refreshLeads();
    };
  }

  return (
    <Modal heading={heading} closeModal={closeModal} >

      <form action={handleSubmit}>

        <input type="hidden" name="id" value={leadForm?.id} />
        <Input type="text" label="first Name" name="firstName" value={leadForm?.firstName}
          onChange={(e: any) => setLeadForm({ ...leadForm, firstName: e.target.value })}
        />
        <Input type="text" label="last Name" name="lastName" value={leadForm?.lastName}
          onChange={(e: any) => setLeadForm({ ...leadForm, lastName: e.target.value })}
        />
        <Input type="text" label="designation" name="designation" value={leadForm?.designation}
          onChange={(e: any) => setLeadForm({ ...leadForm, designation: e.target.value })}
        />
        <Input type="text" label="email" name="email" value={leadForm?.email}
          onChange={(e: any) => setLeadForm({ ...leadForm, email: e.target.value })}
        />
        <Input type="url" label="url" name="url" value={leadForm?.url}
          onChange={(e: any) => setLeadForm({ ...leadForm, url: e.target.value })}
        />
        <Input type="text" label="address" name="address" value={leadForm?.address}
          onChange={(e: any) => setLeadForm({ ...leadForm, address: e.target.value })}
        />

        <ReactSelect
          label="status"
          onChange={(value: any) => setLeadForm({ ...leadForm, status: value })}
          defaultValue={leadForm?.status}
          options={statusOptions}
        />

        <Textarea name='notes' label='notes' value={leadForm?.notes}
          onChange={(e: any) => setLeadForm({ ...leadForm, notes: e.target.value })}
        />
        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default Form;