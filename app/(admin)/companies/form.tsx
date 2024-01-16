'use client'
import { useFormState } from 'react-dom'


import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import Select from '@ui/select';

import { saveCompany } from "./actions";

import { useEffect } from "react";
import Textarea from '@/app/ui/textarea';
import { statusOptions } from '@/app/constants';



interface Props {

  heading: string;
  closeModal: any;
  refreshCompanies: any;
  setCompanyForm: any;
  setResponse?: any;
  companyForm?: {
    id?: number,
    name?: string,
    phone?: string,
    email?: string,
    url?: string,
    status?: string,
    notes?: string,
    type?: string,
    address?: string,
    hiringFrom?: string,
    employees?: string
  }
}

const initialState = {
  message: '',
  status: null
}

const Form: React.FC<Props> = ({ heading, companyForm, setCompanyForm, closeModal, refreshCompanies, setResponse }) => {

  const [state, formAction] = useFormState(saveCompany, initialState);

  useEffect(() => {
    if (state?.status === 201 || state?.status === 200) {
      setResponse(`Lead ${state?.status === 200 ? 'Updated' : state.message}`)
      closeModal();
      refreshCompanies();
    };

  }, [state])


  return (
    <Modal heading={heading} closeModal={closeModal} >


      <form action={formAction}>

        <input type="hidden" name="id" value={companyForm?.id} />
        <Input type="text" label="Name" name="name" value={companyForm?.name}
          onChange={(e: any) => setCompanyForm({ ...companyForm, name: e.target.value })}
        />
        <Input type="text" label="company type" name="type" value={companyForm?.type}
          onChange={(e: any) => setCompanyForm({ ...companyForm, type: e.target.value })}
        />
        <Input type="number" label="no of employees" name="employees" value={companyForm?.employees}
          onChange={(e: any) => setCompanyForm({ ...companyForm, employees: e.target.value })}
        />
        <Input type="text" label="email" name="email" value={companyForm?.email}
          onChange={(e: any) => setCompanyForm({ ...companyForm, email: e.target.value })}
        />
        <Input type="url" label="url" name="url" value={companyForm?.url}
          onChange={(e: any) => setCompanyForm({ ...companyForm, url: e.target.value })}
        />
        <Input type="text" label="address" name="address" value={companyForm?.address}
          onChange={(e: any) => setCompanyForm({ ...companyForm, address: e.target.value })}
        />

        <Input type="text" label="hiring from" name="hiring_form" value={companyForm?.hiringFrom}
          onChange={(e: any) => setCompanyForm({ ...companyForm, hiringFrom: e.target.value })}
        />
        <Select label='status' name='status' options={statusOptions} selected={companyForm?.status}
          onChange={(e: any) => setCompanyForm({ ...companyForm, status: e.target.value })}
        />
        <Textarea name='notes' label='notes' value={companyForm?.notes}
          onChange={(e: any) => setCompanyForm({ ...companyForm, notes: e.target.value })}
        />
        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;