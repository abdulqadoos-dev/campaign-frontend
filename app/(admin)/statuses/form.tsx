'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import Select from '@ui/select';

import { saveStatus } from "./actions";
import { statusTypeOptions } from '@/app/constants';



interface Props {

  heading: string;
  closeModal: any;
  refreshStatuses: any;
  setStatusForm: any;
  setResponse?: any;
  statusForm?: {
    id?: number,
    label?: string,
    value?: string,
    style?: string,
    type?: string,
  }
}


const Form: React.FC<Props> = ({ heading, statusForm, setStatusForm, closeModal, refreshStatuses, setResponse }) => {

  const handleSubmit = async () => {
    const response = await saveStatus(statusForm);
    if (response?.status === 201 || response?.status === 200) {
      setResponse(`Status ${response?.status === 200 ? 'Updated' : response.message}`)
      closeModal();
      refreshStatuses();
    };
  }

  return (
    <Modal heading={heading} closeModal={closeModal} >


      <form action={handleSubmit}>

        <input type="hidden" name="id" value={statusForm?.id} />
        <Input type="text" label="label" name="label" value={statusForm?.label}
          onChange={(e: any) => setStatusForm({ ...statusForm, label: e.target.value })}
        />
        <Input type="text" label="value" name="value" value={statusForm?.value}
          onChange={(e: any) => setStatusForm({ ...statusForm, value: e.target.value })}
        />
        <Input type="text" label="style (bg-red-100 text-red-500)" name="style" value={statusForm?.style}
          onChange={(e: any) => setStatusForm({ ...statusForm, style: e.target.value })}
        />
        <Select label='type' name='type' options={statusTypeOptions} selected={statusForm?.type}
          onChange={(e: any) => setStatusForm({ ...statusForm, type: e.target.value })}
        />
        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;