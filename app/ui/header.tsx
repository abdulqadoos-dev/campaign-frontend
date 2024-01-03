
import Heading from "./heading";
import Breadcrumbs from "./breadcrumbs";


const Header = () => {


  return (
    <header className="mb-4 flex justify-between items-center">

      <div className="title">
        <Breadcrumbs />
        <Heading label={"Dashboard"} className="text-xl" />
      </div>

      <div className="actions">
        
      </div>

    </header>

  )

}

export default Header;