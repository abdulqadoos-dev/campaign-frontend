'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import Select from '@ui/select';
import Textarea from "@/app/ui/textarea";


import { saveStatus } from "./actions";
import { tagColours } from '@/app/constants';


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
    colour?: string,
    notes?: string,
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
          onChange={(e: any) => setStatusForm({ ...statusForm, label: e.target.value, value: e.target.value })}
        />
        <Input type="text" label="value" name="value" value={statusForm?.value}
          onChange={(e: any) => setStatusForm({ ...statusForm, value: e.target.value })}
        />

        <p className="text-sm text-zinc-800 px-2 py-3">colour</p>
        <div className="flex gap-2 flex-wrap">
          {tagColours.map((tagColour, index) =>
            <span key={index}
              onClick={() => setStatusForm({ ...statusForm, colour: tagColour })}
              className={`px-5 py-1 font-semibold text-xs rounded-full ${tagColour} ${statusForm?.colour === tagColour ? "border border-zinc-500 border-dashed" : ""}`}>{statusForm?.label}</span>)}
        </div>

        <Textarea name='notes' label='notes' value={statusForm?.notes}
          onChange={(e: any) => setStatusForm({ ...statusForm, notes: e.target.value })}
        />

        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;