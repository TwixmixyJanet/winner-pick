import { Input, initMDB } from "mdb-ui-kit";

initMDB({ Input });


export const Footer = () => {
    return (
        <footer>
          <div>© 2023 Copyright Recipe Rolodex</div>
          {/* <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
      </footer>
    )
}

export default Footer;