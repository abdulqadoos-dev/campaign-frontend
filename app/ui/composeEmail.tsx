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
      setAlert({ ...alert, message: `Email ${response?.status === 200 ? 'Updated' : response.message}`, isMount: true })
      setComposeEmailModal({ ...composeEmailModal, isMount: false })
    };
  }

  const NEW_MAIL = "New Mail";
  const ALL_MAILS = "All Mails";


  const [activeTab, setActiveTab] = useState(ALL_MAILS);

  const handleSwitchTabs = (title: any) => {
    setActiveTab(title);
  };



  return (
    <Modal heading={composeEmailModal.heading} closeModal={() => setComposeEmailModal({ ...composeEmailModal, isMount: false })} >


      <div className="flex flex-col">


        <ul className="flex flex-row border-b border-zinc-100">
          <li
            className={`px-3 py-2 cursor-pointer ${activeTab === ALL_MAILS ? 'text-lime-400 ' : 'text-zinc-700'}`}
            onClick={() => handleSwitchTabs(ALL_MAILS)}
          >
            {ALL_MAILS}
          </li>
          <li
            className={`px-3 py-2 cursor-pointer ${activeTab === NEW_MAIL ? 'text-lime-400 ' : 'text-zinc-700'}`}
            onClick={() => handleSwitchTabs(NEW_MAIL)}
          >
            {NEW_MAIL}
          </li>

        </ul>


        <div className="p-4">
          <div className={activeTab === NEW_MAIL ? '' : 'hidden'}>

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

              {/* <Input type="text" label="position" value={composeEmailForm?.position || ""}
  onChange={(e: any) => setComposeEmailForm({
    ...composeEmailForm,
    position: e.target.value,
    subject: replacePositionEntities(emailTemplate.subject, e.target.value),
    body: replacePositionEntities(emailTemplate.body, e.target.value),
  })}
/> */}

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

          </div>
          <div className={activeTab === ALL_MAILS ? '' : 'hidden'}>

            <div className="my-5">
              <span>22 jun 2024</span>
              <h1 className="font-bold text-lg">New activity in Freelancer Onboarding</h1>
              <p className="text-sm text-zinc-500">Dear LaSoft Team,

                My name is Abdul Qadoos, a full-stack developer with over 6 years of experience in web development. I'm reaching out today to propose a collaboration between myself and LaSoft, specifically leveraging our combined expertise in React and Laravel.

                I've been following LaSoft's work with great interest, My own background includes strong skills in both frontend development using React, Next.js, TypeScript, and Redux, along with backend development using Laravel, Node.js, and API creation.

                I believe our complementary skillsets would be a powerful asset in tackling complex web development projects.

                Here's how I see our collaboration potentially unfold:
                Enhanced Project Efficiency: By combining LaSoft's established development processes with my focus on React for the frontend and Laravel for the backend, we could streamline development workflows and deliver projects faster.
                Innovative React + Laravel Solutions: My experience in both frameworks allows for a deep understanding of their capabilities.

                Together, we can explore creative solutions that leverage the strengths of both React and Laravel to build user-friendly and scalable web applications.

                I'm confident that collaborating with LaSoft would allow us to create truly exceptional web experiences for clients. I've attached my portfolio for your reference, which showcases some of my previous projects.

                I'm eager to discuss this opportunity further and explore how we can best work together. Please let me know your availability for a call or meeting at your earliest convenience.

                Thank you for your time and consideration.

                Sincerely,

                Abdul Qadoos
                Full-Stack Developer
                https://www.linkedin.com/in/abdulqadoos-dev/
                https://abdulqadoos.dev/
                https://github.com/abdulqadoos-dev</p>
            </div>

          </div>
        </div>
      </div>







    </Modal>
  )
}

export default ComposeEmail;