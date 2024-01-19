'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import { saveActivity } from "./actions";
import Textarea from '@/app/ui/textarea';

import ReactSelect from '@/app/ui/reactSelect';

interface Props {

  heading: string;
  closeModal: any;
  refreshActivities: any;
  setActivityForm: any;
  setResponse?: any;
  statusOptions?: any;
  activityForm?: {
    id?: number,
    name?: string,
    notes?: string,
    status?: {},
  }
}


const Form: React.FC<Props> = ({ heading, activityForm, setActivityForm, closeModal, refreshActivities, setResponse, statusOptions }) => {

  const handleSubmit = async () => {
    const response = await saveActivity(activityForm);
    if (response?.status === 201 || response?.status === 200) {
      setResponse(`Activity ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      refreshActivities();
    };
  }

  return (
    <Modal heading={heading} closeModal={closeModal} >


      <form action={handleSubmit}>

        <input type="hidden" name="id" value={activityForm?.id} />
        <Input type="text" label="name" name="name" value={activityForm?.name}
          onChange={(e: any) => setActivityForm({ ...activityForm, name: e.target.value })}
        />

        <Textarea name='notes' label='notes' value={activityForm?.notes}
          onChange={(e: any) => setActivityForm({ ...activityForm, notes: e.target.value })}
        />

        <ReactSelect
          label="status"
          onChange={(value: any) => setActivityForm({ ...activityForm, status: value })}
          defaultValue={activityForm?.status}
          options={statusOptions}
        />

        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;