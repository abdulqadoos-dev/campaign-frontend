import Input from '@/app/ui/input';
import Select from '@/app/ui/select';
import { statusOptions } from '@/app/constants';
import Action from '@/app/ui/action';
import leftIcon from '@icons/chevron-left.svg';
import rightIcon from '@icons/chevron-right.svg';
interface Props {

  filters: { query: string, status: string, skip: number, take: number };
  setFilters: any;
  count: any;

}


const Filters: React.FC<Props> = ({ filters, setFilters, count }) => {
  return <section className="flex items-center justify-between">

    <div className="flex items-center gap-3">
      <span>Filters:</span>

      <Input name='search' type='serach' value={filters.query} placeholder='search..'
        onChange={(e: any) => {
          let newFilters = { ...filters, query: e.target.value, skip: 0 }
          setFilters(newFilters)
        }}
      />

      <Select palceholder="All" name='status' className="w-fit" selected={filters.status} options={statusOptions}
        onChange={(e: any) => {
          let newFilters = { ...filters, status: e.target.value, skip: 0 }
          setFilters(newFilters)
        }}
      />
    </div>

    <div className="flex items-center text-sm text-zinc-400 gap-2">

      {filters.skip > 0 ? <Action icon={leftIcon} onClick={() => {
        let newFilters = { ...filters, skip: filters.skip - 20 }
        setFilters(newFilters)
      }} /> : <Action icon={leftIcon} />}

      <span>{`${(filters.take + filters.skip) < count ? filters.skip + " - " : ""} ${(filters.take + filters.skip) < count ? (filters.take + filters.skip) : count} of ${count}`}</span>

      {(filters.take + filters.skip) < count ? <Action icon={rightIcon} onClick={() => {
        let newFilters = { ...filters, skip: filters.skip + 20 }
        setFilters(newFilters)
      }} /> : <Action icon={rightIcon} />}

    </div>

  </section>

}

export default Filters