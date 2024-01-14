

interface Props {
  label: string;
}

const NoRecord: React.FC<Props> = ({ label }) => {

  return <div className='w-full h-52 flex items-center justify-center  border-dashed border-red-200 bg-red-50 bg-opacity-30 rounded-large text-center py-5 text-xs font-bold uppercase text-red-300'>
    sorry - no {label} founded !
  </div>


}

export default NoRecord;