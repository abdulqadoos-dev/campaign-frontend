'use client'
import { useFormState } from 'react-dom'


import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import Select from 'react-select';

import { saveActivity } from "./actions";

import { useEffect, useState } from "react";
import { ACTIVITIES, JSON_PARSE } from '@/app/constants';
import Textarea from '@/app/ui/textarea';
import { getStatusesByType } from '../statuses/actions';
import { convertJSON } from '@/app/functions';


interface Props {

  heading: string;
  closeModal: any;
  refreshActivities: any;
  setActivityForm: any;
  setResponse?: any;
  activityForm?: {
    id?: number,
    name?: string,
    notes?: string,
    status?: {},
  }
}

const initialState = {
  message: '',
  status: null
}

const Form: React.FC<Props> = ({ heading, activityForm, setActivityForm, closeModal, refreshActivities, setResponse }) => {

  const [state, formAction] = useFormState(saveActivity, initialState);

  const [statusOptions, setStatusOptions] = useState([])

  useEffect(() => {
    getStatusesByType(ACTIVITIES).then(result => {

      if (result.length) {
        setStatusOptions(result)
      }
    });
  }, [])

  useEffect(() => {
    if (state?.status === 201 || state?.status === 200) {
      setResponse(`Activity ${state?.status === 200 ? 'Updated' : state.message}`)
      closeModal();
      refreshActivities();
    };

  }, [state])

  console.log(activityForm,'check')

  
  return (
    <Modal heading={heading} closeModal={closeModal} >


      <form action={formAction}>

        <input type="hidden" name="id" value={activityForm?.id} />
        <Input type="text" label="name" name="name" value={activityForm?.name}
          onChange={(e: any) => setActivityForm({ ...activityForm, name: e.target.value })}
        />

        <Textarea name='notes' label='notes' value={activityForm?.notes}
          onChange={(e: any) => setActivityForm({ ...activityForm, notes: e.target.value })}
        />


        <Select
          name="status"
          defaultValue={convertJSON(activityForm?.status, JSON_PARSE) }
          options={statusOptions}
        />

        {/* <Select label='status' name='status' options={statusOptions} selected={activityForm?.status}
          onChange={(e: any) => setActivityForm({ ...activityForm, status: e.target.value })}
        /> */}
        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;