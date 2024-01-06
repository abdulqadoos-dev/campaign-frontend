import Heading from "@ui/heading";
import Icon from "@ui/icon";

import CloseIcon from "@icons/close.svg";

interface Props {

  children?: React.ReactNode;
  heading: string;
  closeModal: any;
}


const Modal: React.FC<Props> = ({ children, heading, closeModal }) => {
  return (
    <section className="h-screen flex items-center justify-end w-screen bg-lime-950 bg-opacity-10 absolute top-0 left-0 ">
      <div className=" bg-white p-5 w-1/3 round h-screen shadow-lg relative">
        <div className="absolute top-3 right-3 ">
          <Icon icon={CloseIcon} onClick={closeModal} />
        </div>
        <Heading label={heading} className="text-2xl text-center my-4 " />
        <section> {children} </section>
      </div>
    </section>
  )
}

export default Modal;