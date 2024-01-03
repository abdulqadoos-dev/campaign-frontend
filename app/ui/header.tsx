
import Button from "./button";
import Heading from "./heading";
import Breadcrumbs from "./breadcrumbs";


const Header = () => {


  return (
    <header className="mb-4 flex justify-between items-center">

      <div className="title">
        <Breadcrumbs />
        <Heading />
      </div>

      <div className="actions">
        <Button />
      </div>

    </header>

  )

}

export default Header;