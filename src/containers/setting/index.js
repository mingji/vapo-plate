import React, { Component } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
class SettingContainer extends Component {
  state = {
    active: -1,
    activeLabel: "",
    isShown: false,
  };
  render() {
    const { active, activeLabel, isShown } = this.state;
    return (
      <div className="setting-container">
        <div className="row">
          <div
            className={`col-12 top col-sm-12 col-md-4 ${isShown && "hide-sm"}`}
          >
            <div className="item heading">
              <h5>Setting</h5>
            </div>
            <div className="item heading">
              <h5> @{this.props.user.username || "NOT SET"}</h5>
            </div>
            <div
              className={`item ${active === 0 && "active"}`}
              onClick={(e) =>
                this.setState({
                  active: 0,
                  isShown: true,
                  activeLabel: "Notifications",
                })
              }
            >
              <p>
                Notifications <i class="fas fa-chevron-right"></i>
              </p>
            </div>
            <div
              className={`item ${active === 1 && "active"}`}
              onClick={(e) =>
                this.setState({
                  active: 1,
                  isShown: true,
                  activeLabel: "Terms of services",
                })
              }
            >
              <p>
                Terms of services <i class="fas fa-chevron-right"></i>
              </p>
            </div>
            <div
              className={`item ${active === 2 && "active"}`}
              onClick={(e) =>
                this.setState({
                  active: 2,
                  isShown: true,
                  activeLabel: "Privacy Policy",
                })
              }
            >
              <p>
                Privacy Policy <i class="fas fa-chevron-right"></i>
              </p>
            </div>
            <div
              className={`item ${active === 3 && "active"}`}
              onClick={(e) =>
                this.setState({
                  active: 3,
                  isShown: true,
                  activeLabel: "Contact",
                })
              }
            >
              <p>
                Contact <i class="fas fa-chevron-right"></i>
              </p>
            </div>
            <div
              className={`item ${active === 4 && "active"}`}
              onClick={(e) =>
                this.setState({
                  active: 4,
                  isShown: true,
                  activeLabel: "About Findfun",
                })
              }
            >
              <p>
                About Findfun <i class="fas fa-chevron-right"></i>
              </p>
            </div>
          </div>
          {activeLabel && (
            <div
              className={`col-12 bottom col-sm-12 pb-4 col-md-8  ${
                !isShown && "hide-sm"
              }`}
            >
              <div
                className="item heading"
                onClick={(e) => this.setState({ isShown: false })}
              >
                <h5>
                  <i class="fas fa-chevron-left mr-1 d-inline-block d-md-none d-lg-none"></i>

                  {activeLabel}
                </h5>
              </div>
              <div className="item ">
                {active === 2 && (
                  <>
                    <p>Last updated: May 07, 2020</p>

                    <p>
                      This Privacy Policy describes Our policies and procedures
                      on the collection, use and disclosure of Your information
                      when You use the Service and tells You about Your privacy
                      rights and how the law protects You.
                    </p>

                    <p>
                      We use Your Personal data to provide and improve the
                      Service. By using the Service, You agree to the collection
                      and use of information in accordance with this Privacy
                      Policy.
                    </p>

                    <h1>Interpretation and Definitions</h1>
                    <h2>Interpretation</h2>
                    <p>
                      The words of which the initial letter is capitalized have
                      meanings defined under the following conditions.
                    </p>
                    <p>
                      The following definitions shall have the same meaning
                      regardless of whether they appear in singular or in
                      plural.
                    </p>

                    <h2>Definitions</h2>
                    <p>For the purposes of this Privacy Policy:</p>
                    <ul>
                      <li>
                        <p>
                          <strong>You</strong> means the individual accessing or
                          using the Service, or the company, or other legal
                          entity on behalf of which such individual is accessing
                          or using the Service, as applicable.
                        </p>
                        <p>
                          Under GDPR (General Data Protection Regulation), You
                          can be referred to as the Data Subject or as the User
                          as you are the individual using the Service.
                        </p>{" "}
                      </li>
                      <li>
                        <p>
                          <strong>Company</strong> (referred to as either
                          &quot;the Company&quot;, &quot;We&quot;,
                          &quot;Us&quot; or &quot;Our&quot; in this Agreement)
                          refers to findfun.
                        </p>
                        <p>
                          For the purpose of the GDPR, the Company is the Data
                          Controller.
                        </p>{" "}
                      </li>
                      <li>
                        <strong>Application</strong> means the software program
                        provided by the Company downloaded by You on any
                        electronic device, named findfun
                      </li>{" "}
                      <li>
                        <strong>Affiliate</strong> means an entity that
                        controls, is controlled by or is under common control
                        with a party, where &quot;control&quot; means ownership
                        of 50% or more of the shares, equity interest or other
                        securities entitled to vote for election of directors or
                        other managing authority.
                      </li>
                      <li>
                        <strong>Account</strong> means a unique account created
                        for You to access our Service or parts of our Service.
                      </li>
                      <li>
                        <strong>Website</strong> refers to findfun, accessible
                        from{" "}
                        <a href="http://findfun.com" target="_blank">
                          findfun.com
                        </a>
                      </li>{" "}
                      <li>
                        <strong>Service</strong> refers to the Application or
                        the Website or both.
                      </li>
                      <li>
                        <strong>Country</strong> refers to: California, United
                        States
                      </li>
                      <li>
                        <p>
                          <strong>Service Provider</strong> means any natural or
                          legal person who processes the data on behalf of the
                          Company. It refers to third-party companies or
                          individuals employed by the Company to facilitate the
                          Service, to provide the Service on behalf of the
                          Company, to perform services related to the Service or
                          to assist the Company in analyzing how the Service is
                          used.
                        </p>
                        <p>
                          For the purpose of the GDPR, Service Providers are
                          considered Data Processors.
                        </p>{" "}
                      </li>
                      <li>
                        <strong>Third-party Social Media Service</strong> refers
                        to any website or any social network website through
                        which a User can log in or create an account to use the
                        Service.
                      </li>
                      <li>
                        <strong>Facebook Fan Page</strong> is a public profile
                        named Findfun specifically created by the Company on the
                        Facebook social network, accessible from{" "}
                        <a
                          href="https://www.facebook.com/Findfunofficial/?modal=admin_todo_tour"
                          target="_blank"
                        >
                          https://www.facebook.com/
                          <wbr />
                          Findfunofficial/?modal=admin_
                          <wbr />
                          todo_tour
                        </a>
                      </li>{" "}
                      <li>
                        <p>
                          <strong>Personal Data</strong> is any information that
                          relates to an identified or identifiable individual.
                        </p>
                        <p>
                          For the purposes for GDPR, Personal Data means any
                          information relating to You such as a name, an
                          identification number, location data, online
                          identifier or to one or more factors specific to the
                          physical, physiological, genetic, mental, economic,
                          cultural or social identity.
                        </p>{" "}
                        <p>
                          For the purposes of the CCPA, Personal Data means any
                          information that identifies, relates to, describes or
                          is capable of being associated with, or could
                          reasonably be linked, directly or indirectly, with
                          You.
                        </p>{" "}
                      </li>
                      <li>
                        <strong>Cookies</strong> are small files that are placed
                        on Your computer, mobile device or any other device by a
                        website, containing the details of Your browsing history
                        on that website among its many uses.
                      </li>{" "}
                      <li>
                        <strong>Device</strong> means any device that can access
                        the Service such as a computer, a cellphone or a digital
                        tablet.
                      </li>
                      <li>
                        <strong>Usage Data</strong> refers to data collected
                        automatically, either generated by the use of the
                        Service or from the Service infrastructure itself (for
                        example, the duration of a page visit).
                      </li>
                      <li>
                        <strong>Data Controller</strong>, for the purposes of
                        the GDPR (General Data Protection Regulation), refers to
                        the Company as the legal person which alone or jointly
                        with others determines the purposes and means of the
                        processing of Personal Data.
                      </li>{" "}
                      <li>
                        <strong>Do Not Track</strong> (DNT) is a concept that
                        has been promoted by US regulatory authorities, in
                        particular the U.S. Federal Trade Commission (FTC), for
                        the Internet industry to develop and implement a
                        mechanism for allowing internet users to control the
                        tracking of their online activities across websites.
                      </li>{" "}
                      <li>
                        <strong>Business</strong>, for the purpose of the CCPA
                        (California Consumer Privacy Act), refers to the Company
                        as the legal entity that collects Consumers&#39;
                        personal information and determines the purposes and
                        means of the processing of Consumers&#39; personal
                        information, or on behalf of which such information is
                        collected and that alone, or jointly with others,
                        determines the purposes and means of the processing of
                        consumers&#39; personal information, that does business
                        in the State of California.
                      </li>
                      <li>
                        <strong>Consumer</strong>, for the purpose of the CCPA
                        (California Consumer Privacy Act), means a natural
                        person who is a California resident. A resident, as
                        defined in the law, includes (1) every individual who is
                        in the USA for other than a temporary or transitory
                        purpose, and (2) every individual who is domiciled in
                        the USA who is outside the USA for a temporary or
                        transitory purpose.
                      </li>
                      <li>
                        <strong>Sale</strong>, for the purpose of the CCPA
                        (California Consumer Privacy Act), means selling,
                        renting, releasing, disclosing, disseminating, making
                        available, transferring, or otherwise communicating
                        orally, in writing, or by electronic or other means, a
                        Consumer&#39;s Personal information to another business
                        or a third party for monetary or other valuable
                        consideration.
                      </li>
                    </ul>

                    <h1>Collecting and Using Your Personal Data</h1>
                    <h2>Types of Data Collected</h2>

                    <h3>Personal Data</h3>
                    <p>
                      While using Our Service, We may ask You to provide Us with
                      certain personally identifiable information that can be
                      used to contact or identify You. Personally identifiable
                      information may include, but is not limited to:
                    </p>
                    <ul>
                      <li>Email address</li> <li>First name and last name</li>{" "}
                      <li>Phone number</li>{" "}
                      <li>Address, State, Province, ZIP/Postal code, City</li>{" "}
                      <li>
                        Bank account information in order to pay for products
                        and/or services within the Service
                      </li>{" "}
                      <li>Usage Data</li>
                    </ul>

                    <p>
                      When You pay for a product and/or a service via bank
                      transfer, We may ask You to provide information to
                      facilitate this transaction and to verify Your identity.
                      Such information may include, without limitation:
                    </p>
                    <ul>
                      <li>Date of birth</li>
                      <li>Passport or National ID card</li>
                      <li>Bank card statement</li>
                      <li>Other information linking You to an address</li>
                    </ul>

                    <h3>Usage Data</h3>
                    <p>
                      Usage Data is collected automatically when using the
                      Service.
                    </p>
                    <p>
                      Usage Data may include information such as Your
                      Device&#39;s Internet Protocol address (e.g. IP address),
                      browser type, browser version, the pages of our Service
                      that You visit, the time and date of Your visit, the time
                      spent on those pages, unique device identifiers and other
                      diagnostic data.
                    </p>
                    <p>
                      When You access the Service by or through a mobile device,
                      We may collect certain information automatically,
                      including, but not limited to, the type of mobile device
                      You use, Your mobile device unique ID, the IP address of
                      Your mobile device, Your mobile operating system, the type
                      of mobile Internet browser You use, unique device
                      identifiers and other diagnostic data.
                    </p>
                    <p>
                      We may also collect information that Your browser sends
                      whenever You visit our Service or when You access the
                      Service by or through a mobile device.
                    </p>

                    <h3>Information from Third-Party Social Media Services</h3>
                    <p>
                      The Company allows You to create an account and log in to
                      use the Service through the following Third-party Social
                      Media Services:
                    </p>
                    <ul>
                      <li>Google</li>
                      <li>Facebook</li>
                      <li>Twitter</li>
                    </ul>
                    <p>
                      If You decide to register through or otherwise grant us
                      access to a Third-Party Social Media Service, We may
                      collect Personal data that is already associated with Your
                      Third-Party Social Media Service&#39;s account, such as
                      Your name, Your email address, Your activities or Your
                      contact list associated with that account.
                    </p>
                    <p>
                      You may also have the option of sharing additional
                      information with the Company through Your Third-Party
                      Social Media Service&#39;s account. If You choose to
                      provide such information and Personal Data, during
                      registration or otherwise, You are giving the Company
                      permission to use, share, and store it in a manner
                      consistent with this Privacy Policy.
                    </p>

                    <h3>Information Collected while Using the Application</h3>
                    <p>
                      While using Our Application, in order to provide features
                      of Our Application, We may collect, with your prior
                      permission:
                    </p>
                    <ul>
                      <li>Information regarding your location</li>{" "}
                      <li>
                        Information from your Device&#39;s phone book (contacts
                        list)
                      </li>{" "}
                      <li>
                        Pictures and other information from your Device&#39;s
                        camera and photo library
                      </li>
                    </ul>
                    <p>
                      We use this information to provide features of Our
                      Service, to improve and customize Our Service. The
                      information may be uploaded to the Company&#39;s servers
                      and/or a Service Provider&#39;s server or it be simply
                      stored on Your device.
                    </p>
                    <p>
                      You can enable or disable access to this information at
                      any time, through Your Device settings.
                    </p>

                    <h3>Tracking Technologies and Cookies</h3>
                    <p>
                      We use Cookies and similar tracking technologies to track
                      the activity on Our Service and store certain information.
                      Tracking technologies used are beacons, tags, and scripts
                      to collect and track information and to improve and
                      analyze Our Service.
                    </p>
                    <p>
                      You can instruct Your browser to refuse all Cookies or to
                      indicate when a Cookie is being sent. However, if You do
                      not accept Cookies, You may not be able to use some parts
                      of our Service.
                    </p>
                    <p>
                      Cookies can be &quot;Persistent&quot; or
                      &quot;Session&quot; Cookies. Persistent Cookies remain on
                      your personal computer or mobile device when You go
                      offline, while Session Cookies are deleted as soon as You
                      close your web browser. Learn more about cookies in the{" "}
                      <a
                        href="https://www.privacypolicies.com/blog/cookies/"
                        target="_blank"
                      >
                        &quot;What Are Cookies&quot;
                      </a>{" "}
                      article.
                    </p>
                    <p>
                      We use both session and persistent Cookies for the
                      purposes set out below:
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Necessary / Essential Cookies</strong>
                          <p>Type: Session Cookies</p>
                          <p>Administered by: Us</p>
                          <p>
                            Purpose: These Cookies are essential to provide You
                            with services available through the Website and to
                            enable You to use some of its features. They help to
                            authenticate users and prevent fraudulent use of
                            user accounts. Without these Cookies, the services
                            that You have asked for cannot be provided, and We
                            only use these Cookies to provide You with those
                            services.
                          </p>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>
                            Cookies Policy / Notice Acceptance Cookies
                          </strong>
                        </p>
                        <p>Type: Persistent Cookies</p>
                        <p>Administered by: Us</p>
                        <p>
                          Purpose: These Cookies identify if users have accepted
                          the use of cookies on the Website.
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Functionality Cookies</strong>
                        </p>
                        <p>Type: Persistent Cookies</p>
                        <p>Administered by: Us</p>
                        <p>
                          Purpose: These Cookies allow us to remember choices
                          You make when You use the Website, such as remembering
                          your login details or language preference. The purpose
                          of these Cookies is to provide You with a more
                          personal experience and to avoid You having to
                          re-enter your preferences every time You use the
                          Website.
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Tracking and Performance Cookies</strong>
                        </p>
                        <p>Type: Persistent Cookies</p>
                        <p>Administered by: Third-Parties</p>
                        <p>
                          Purpose: These Cookies are used to track information
                          about traffic to the Website and how users use the
                          Website. The information gathered via these Cookies
                          may directly or indirectly identify you as an
                          individual visitor. This is because the information
                          collected is typically linked to a pseudonymous
                          identifier associated with the device you use to
                          access the Website. We may also use these Cookies to
                          test new advertisements, pages, features or new
                          functionality of the Website to see how our users
                          react to them.
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Targeting and Advertising Cookies</strong>
                        </p>
                        <p>Type: Persistent Cookies</p>
                        <p>Administered by: Third-Parties</p>
                        <p>
                          Purpose: These Cookies track your browsing habits to
                          enable Us to show advertising which is more likely to
                          be of interest to You. These Cookies use information
                          about your browsing history to group You with other
                          users who have similar interests. Based on that
                          information, and with Our permission, third party
                          advertisers can place Cookies to enable them to show
                          adverts which We think will be relevant to your
                          interests while You are on third party websites.
                        </p>
                      </li>
                    </ul>
                    <p>
                      For more information about the cookies we use and your
                      choices regarding cookies, please visit our Cookies
                      Policy.
                    </p>

                    <h2>Use of Your Personal Data</h2>
                    <p>
                      The Company may use Personal Data for the following
                      purposes:
                    </p>
                    <ul>
                      <li>
                        <strong>To provide and maintain our Service</strong>,
                        including to monitor the usage of our Service.
                      </li>
                      <li>
                        <strong>To manage Your Account:</strong> to manage Your
                        registration as a user of the Service. The Personal Data
                        You provide can give You access to different
                        functionalities of the Service that are available to You
                        as a registered user.
                      </li>
                      <li>
                        <strong>For the performance of a contract:</strong> the
                        development, compliance and undertaking of the purchase
                        contract for the products, items or services You have
                        purchased or of any other contract with Us through the
                        Service.
                      </li>
                      <li>
                        <strong>To contact You:</strong> To contact You by
                        email, telephone calls, SMS, or other equivalent forms
                        of electronic communication, such as a mobile
                        application&#39;s push notifications regarding updates
                        or informative communications related to the
                        functionalities, products or contracted services,
                        including the security updates, when necessary or
                        reasonable for their implementation.
                      </li>
                      <li>
                        <strong>To provide You</strong> with news, special
                        offers and general information about other goods,
                        services and events which we offer that are similar to
                        those that you have already purchased or enquired about
                        unless You have opted not to receive such information.
                      </li>
                      <li>
                        <strong>To manage Your requests:</strong> To attend and
                        manage Your requests to Us.
                      </li>
                    </ul>

                    <p>
                      We may share your personal information in the following
                      situations:
                    </p>

                    <ul>
                      <li>
                        <strong>With Service Providers:</strong> We may share
                        Your personal information with Service Providers to
                        monitor and analyze the use of our Service, to show
                        advertisements to You to help support and maintain Our
                        Service, to advertise on third party websites to You
                        after You visited our Service, for payment processing,
                        to contact You.
                      </li>
                      <li>
                        <strong>For Business transfers:</strong> We may share or
                        transfer Your personal information in connection with,
                        or during negotiations of, any merger, sale of Company
                        assets, financing, or acquisition of all or a portion of
                        our business to another company.
                      </li>
                      <li>
                        <strong>With Affiliates:</strong> We may share Your
                        information with Our affiliates, in which case we will
                        require those affiliates to honor this Privacy Policy.
                        Affiliates include Our parent company and any other
                        subsidiaries, joint venture partners or other companies
                        that We control or that are under common control with
                        Us.
                      </li>
                      <li>
                        <strong>With Business partners:</strong> We may share
                        Your information with Our business partners to offer You
                        certain products, services or promotions.
                      </li>
                      <li>
                        <strong>With other users:</strong> when You share
                        personal information or otherwise interact in the public
                        areas with other users, such information may be viewed
                        by all users and may be publicly distributed outside. If
                        You interact with other users or register through a
                        Third-Party Social Media Service, Your contacts on the
                        Third-Party Social Media Service may see Your name,
                        profile, pictures and description of Your activity.
                        Similarly, other users will be able to view descriptions
                        of Your activity, communicate with You and view Your
                        profile.
                      </li>
                    </ul>

                    <h2>Retention of Your Personal Data</h2>
                    <p>
                      The Company will retain Your Personal Data only for as
                      long as is necessary for the purposes set out in this
                      Privacy Policy. We will retain and use Your Personal Data
                      to the extent necessary to comply with our legal
                      obligations (for example, if we are required to retain
                      your data to comply with applicable laws), resolve
                      disputes, and enforce our legal agreements and policies.
                    </p>
                    <p>
                      The Company will also retain Usage Data for internal
                      analysis purposes. Usage Data is generally retained for a
                      shorter period of time, except when this data is used to
                      strengthen the security or to improve the functionality of
                      Our Service, or We are legally obligated to retain this
                      data for longer time periods.
                    </p>

                    <h2>Transfer of Your Personal Data</h2>
                    <p>
                      Your information, including Personal Data, is processed at
                      the Company&#39;s operating offices and in any other
                      places where the parties involved in the processing are
                      located. It means that this information may be transferred
                      to — and maintained on — computers located outside of Your
                      state, province, country or other governmental
                      jurisdiction where the data protection laws may differ
                      than those from Your jurisdiction.
                    </p>
                    <p>
                      Your consent to this Privacy Policy followed by Your
                      submission of such information represents Your agreement
                      to that transfer.
                    </p>
                    <p>
                      The Company will take all steps reasonably necessary to
                      ensure that Your data is treated securely and in
                      accordance with this Privacy Policy and no transfer of
                      Your Personal Data will take place to an organization or a
                      country unless there are adequate controls in place
                      including the security of Your data and other personal
                      information.
                    </p>

                    <h2>Disclosure of Your Personal Data</h2>
                    <h3>Business Transactions</h3>
                    <p>
                      If the Company is involved in a merger, acquisition or
                      asset sale, Your Personal Data may be transferred. We will
                      provide notice before Your Personal Data is transferred
                      and becomes subject to a different Privacy Policy.
                    </p>
                    <h3>Law enforcement</h3>
                    <p>
                      Under certain circumstances, the Company may be required
                      to disclose Your Personal Data if required to do so by law
                      or in response to valid requests by public authorities
                      (e.g. a court or a government agency).
                    </p>
                    <h3>Other legal requirements</h3>
                    <p>
                      The Company may disclose Your Personal Data in the good
                      faith belief that such action is necessary to:
                    </p>
                    <ul>
                      <li>Comply with a legal obligation</li>
                      <li>
                        Protect and defend the rights or property of the Company
                      </li>
                      <li>
                        Prevent or investigate possible wrongdoing in connection
                        with the Service
                      </li>
                      <li>
                        Protect the personal safety of Users of the Service or
                        the public
                      </li>
                      <li>Protect against legal liability</li>
                    </ul>

                    <h2>Security of Your Personal Data</h2>
                    <p>
                      The security of Your Personal Data is important to Us, but
                      remember that no method of transmission over the Internet,
                      or method of electronic storage is 100% secure. While We
                      strive to use commercially acceptable means to protect
                      Your Personal Data, We cannot guarantee its absolute
                      security.
                    </p>

                    <h1>
                      Detailed Information on the Processing of Your Personal
                      Data
                    </h1>
                    <p>
                      Service Providers have access to Your Personal Data only
                      to perform their tasks on Our behalf and are obligated not
                      to disclose or use it for any other purpose.
                    </p>

                    <h2>Analytics</h2>
                    <p>
                      We may use third-party Service providers to monitor and
                      analyze the use of our Service.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Google Analytics</strong>
                        </p>
                        <p>
                          Google Analytics is a web analytics service offered by
                          Google that tracks and reports website traffic. Google
                          uses the data collected to track and monitor the use
                          of our Service. This data is shared with other Google
                          services. Google may use the collected data to
                          contextualise and personalise the ads of its own
                          advertising network.
                        </p>
                        <p>
                          For more information on the privacy practices of
                          Google, please visit the Google Privacy &amp; Terms
                          web page:{" "}
                          <a
                            href="https://policies.google.com/privacy?hl=en"
                            target="_blank"
                          >
                            https://policies.google.com/
                            <wbr />
                            privacy?hl=en
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Firebase</strong>
                        </p>
                        <p>
                          Firebase is an analytics service provided by Google
                          Inc.
                        </p>
                        <p>
                          You may opt-out of certain Firebase features through
                          your mobile device settings, such as your device
                          advertising settings or by following the instructions
                          provided by Google in their Privacy Policy:{" "}
                          <a
                            href="https://policies.google.com/privacy?hl=en"
                            target="_blank"
                          >
                            https://policies.google.com/
                            <wbr />
                            privacy?hl=en
                          </a>
                        </p>
                        <p>
                          We also encourage you to review the Google&#39;s
                          policy for safeguarding your data:{" "}
                          <a
                            href="https://support.google.com/analytics/answer/6004245"
                            target="_blank"
                          >
                            https://support.google.com/
                            <wbr />
                            analytics/answer/6004245
                          </a>
                          .
                        </p>
                        <p>
                          For more information on what type of information
                          Firebase collects, please visit the Google Privacy
                          &amp; Terms web page:{" "}
                          <a
                            href="https://policies.google.com/privacy?hl=en"
                            target="_blank"
                          >
                            https://policies.google.com/
                            <wbr />
                            privacy?hl=en
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Matomo</strong>
                        </p>
                        <p>
                          Matomo is a web analytics service. You can visit their
                          Privacy Policy page here:{" "}
                          <a
                            href="https://matomo.org/privacy-policy"
                            target="_blank"
                          >
                            https://matomo.org/privacy-
                            <wbr />
                            policy
                          </a>
                        </p>
                      </li>
                    </ul>

                    <h2>Advertising</h2>
                    <p>
                      We may use Service providers to show advertisements to You
                      to help support and maintain Our Service.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>
                            Google AdSense &amp; DoubleClick Cookie
                          </strong>
                        </p>
                        <p>
                          Google, as a third party vendor, uses cookies to serve
                          ads on our Service. Google&#39;s use of the
                          DoubleClick cookie enables it and its partners to
                          serve ads to our users based on their visit to our
                          Service or other websites on the Internet.
                        </p>
                        <p>
                          You may opt out of the use of the DoubleClick Cookie
                          for interest-based advertising by visiting the Google
                          Ads Settings web page:{" "}
                          <a
                            href="http://www.google.com/ads/preferences/"
                            target="_blank"
                          >
                            http://www.google.com/ads/
                            <wbr />
                            preferences/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>AdMob by Google</strong>
                        </p>
                        <p>AdMob by Google is provided by Google Inc.</p>
                        <p>
                          You can opt-out from the AdMob by Google service by
                          following the instructions described by Google:{" "}
                          <a
                            href="https://support.google.com/ads/answer/2662922?hl=en"
                            target="_blank"
                          >
                            https://support.google.com/
                            <wbr />
                            ads/answer/2662922?hl=en
                          </a>
                        </p>
                        <p>
                          For more information on how Google uses the collected
                          information, please visit the &quot;How Google uses
                          data when you use our partners&#39; sites or app&quot;
                          page:{" "}
                          <a
                            href="https://policies.google.com/technologies/partner-sites"
                            target="_blank"
                          >
                            https://policies.google.com/
                            <wbr />
                            technologies/partner-sites
                          </a>{" "}
                          or visit the Privacy Policy of Google:{" "}
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                          >
                            https://policies.google.com/
                            <wbr />
                            privacy
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Bing Ads</strong>
                        </p>
                        <p>
                          Bing Ads is an advertising service provided by
                          Microsoft Inc.
                        </p>
                        <p>
                          You can opt-out from Bing Ads by following the
                          instructions on Bing Ads Opt-out page:{" "}
                          <a
                            href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                            target="_blank"
                          >
                            https://advertise.bingads.
                            <wbr />
                            microsoft.com/en-us/resources/
                            <wbr />
                            policies/personalized-ads
                          </a>
                        </p>
                        <p>
                          For more information about Bing Ads, please visit
                          their Privacy Policy:{" "}
                          <a
                            href="https://privacy.microsoft.com/en-us/PrivacyStatement"
                            target="_blank"
                          >
                            https://privacy.microsoft.com/
                            <wbr />
                            en-us/PrivacyStatement
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Flurry</strong>
                        </p>
                        <p>Flurry is provided by Yahoo! Inc.</p>
                        <p>
                          You can opt-out of the Flurry service and prevent it
                          from using and sharing your information by visiting
                          the Flurry Opt-out page:{" "}
                          <a
                            href="https://developer.yahoo.com/flurry/end-user-opt-out/"
                            target="_blank"
                          >
                            https://developer.yahoo.com/
                            <wbr />
                            flurry/end-user-opt-out/
                          </a>
                        </p>
                        <p>
                          For more information on the privacy practices policies
                          of Yahoo!, please visit their Privacy Policy:{" "}
                          <a
                            href="https://policies.yahoo.com/xa/en/yahoo/privacy/index.htm"
                            target="_blank"
                          >
                            https://policies.yahoo.com/xa/
                            <wbr />
                            en/yahoo/privacy/index.htm
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>InMobi</strong>
                        </p>
                        <p>InMobi is provided by InMobi Pte Ltd.</p>
                        <p>
                          You can opt-out from InMobi service by following the
                          instructions as described on the InMobi Opt-out page:{" "}
                          <a
                            href="http://www.inmobi.com/page/opt-out/"
                            target="_blank"
                          >
                            http://www.inmobi.com/page/
                            <wbr />
                            opt-out/
                          </a>
                        </p>
                        <p>
                          For more information on the privacy practices and
                          policies of InMobi, please visit the InMobi Privacy
                          Policy:{" "}
                          <a
                            href="http://www.inmobi.com/privacy-policy/"
                            target="_blank"
                          >
                            http://www.inmobi.com/privacy-
                            <wbr />
                            policy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>MoPub</strong>
                        </p>
                        <p>MoPub is provided by MobPub Inc.</p>
                        <p>
                          You can opt-out from MobPub service by following the
                          instructions on MoPub Opt-out page:{" "}
                          <a
                            href="http://www.mopub.com/optout/"
                            target="_blank"
                          >
                            http://www.mopub.com/optout/
                          </a>
                        </p>
                        <p>
                          For more information on what information MobPub
                          collects and how it is used, please read MoPub Privacy
                          Policy:{" "}
                          <a
                            href="http://www.mopub.com/legal/privacy/"
                            target="_blank"
                          >
                            http://www.mopub.com/legal/
                            <wbr />
                            privacy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>StartApp</strong>
                        </p>
                        <p>StartApp is provided by StartApp Inc.</p>
                        <p>
                          You can opt-out from interest-based ads served by
                          StartApp by following the instructions on their
                          Privacy Policy, section &quot;8. Your Choices and
                          Controls&quot;:{" "}
                          <a
                            href="https://www.startapp.com/policy/privacy-policy/"
                            target="_blank"
                          >
                            https://www.startapp.com/
                            <wbr />
                            policy/privacy-policy/
                          </a>
                        </p>
                        <p>
                          For more information on what information StartApp
                          collects and how it is used, please read their Privacy
                          Policy:{" "}
                          <a
                            href="https://www.startapp.com/policy/privacy-policy/"
                            target="_blank"
                          >
                            https://www.startapp.com/
                            <wbr />
                            policy/privacy-policy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>AdColony</strong>
                        </p>
                        <p>AdColony is provided by Jirbo Inc.</p>
                        <p>
                          You can opt-out from AdColony service by visiting the
                          AdColony Opt-out page:{" "}
                          <a
                            href="https://www.adcolony.com/privacy-policy/"
                            target="_blank"
                          >
                            https://www.adcolony.com/
                            <wbr />
                            privacy-policy/
                          </a>
                        </p>
                        <p>
                          You can also opt-out from AdColony through the Digital
                          Advertising Alliance in the USA{" "}
                          <a
                            href="http://www.aboutads.info/choices/"
                            target="_blank"
                          >
                            http://www.aboutads.info/
                            <wbr />
                            choices/
                          </a>{" "}
                          or opt-out using your mobile device settings.
                        </p>
                        <p>
                          For more information AdColony, please visit the
                          Privacy Policy of AdColony:{" "}
                          <a
                            href="http://www.adcolony.com/privacy-policy/"
                            target="_blank"
                          >
                            http://www.adcolony.com/
                            <wbr />
                            privacy-policy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>AppLovin</strong>
                        </p>
                        <p>AppLovin is provided by the AppLovin Corporation.</p>
                        <p>
                          If you&#39;d like to opt-out from AppLovin service,
                          please visit the AppLovin Opt-out page:{" "}
                          <a
                            href="https://www.applovin.com/optout"
                            target="_blank"
                          >
                            https://www.applovin.com/
                            <wbr />
                            optout
                          </a>
                        </p>
                        <p>
                          If you&#39;d like to learn more about AppLovin, please
                          visit the Privacy Policy page of AppLovin:{" "}
                          <a
                            href="https://www.applovin.com/privacy"
                            target="_blank"
                          >
                            https://www.applovin.com/
                            <wbr />
                            privacy
                          </a>
                        </p>
                      </li>
                    </ul>

                    <h2>Email Marketing</h2>
                    <p>
                      We may use Your Personal Data to contact You with
                      newsletters, marketing or promotional materials and other
                      information that may be of interest to You. You may
                      opt-out of receiving any, or all, of these communications
                      from Us by following the unsubscribe link or instructions
                      provided in any email We send or by contacting Us.
                    </p>
                    <p>
                      We may use Email Marketing Service Providers to manage and
                      send emails to You.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Mailchimp</strong>
                        </p>
                        <p>
                          Mailchimp is an email marketing sending service
                          provided by The Rocket Science Group LLC.
                        </p>
                        <p>
                          For more information on the privacy practices of
                          Mailchimp, please visit their Privacy policy:{" "}
                          <a
                            href="https://mailchimp.com/legal/privacy/"
                            target="_blank"
                          >
                            https://mailchimp.com/legal/
                            <wbr />
                            privacy/
                          </a>
                        </p>
                      </li>
                    </ul>

                    <h2>Behavioral Remarketing</h2>
                    <p>
                      The Company uses remarketing services to advertise on
                      third party websites to You after You visited our Service.
                      We and Our third-party vendors use cookies to inform,
                      optimize and serve ads based on Your past visits to our
                      Service.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Google Ads (AdWords)</strong>
                        </p>
                        <p>
                          Google Ads (AdWords) remarketing service is provided
                          by Google Inc.
                        </p>
                        <p>
                          You can opt-out of Google Analytics for Display
                          Advertising and customise the Google Display Network
                          ads by visiting the Google Ads Settings page:{" "}
                          <a
                            href="http://www.google.com/settings/ads"
                            target="_blank"
                          >
                            http://www.google.com/
                            <wbr />
                            settings/ads
                          </a>
                        </p>
                        <p>
                          Google also recommends installing the Google Analytics
                          Opt-out Browser Add-on -{" "}
                          <a
                            href="https://tools.google.com/dlpage/gaoptout"
                            target="_blank"
                          >
                            https://tools.google.com/
                            <wbr />
                            dlpage/gaoptout
                          </a>{" "}
                          - for your web browser. Google Analytics Opt-out
                          Browser Add-on provides visitors with the ability to
                          prevent their data from being collected and used by
                          Google Analytics.
                        </p>
                        <p>
                          For more information on the privacy practices of
                          Google, please visit the Google Privacy &amp; Terms
                          web page:{" "}
                          <a
                            href="https://policies.google.com/privacy?hl=en"
                            target="_blank"
                          >
                            https://policies.google.com/
                            <wbr />
                            privacy?hl=en
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Bing Ads Remarketing</strong>
                        </p>
                        <p>
                          Bing Ads remarketing service is provided by Microsoft
                          Inc.
                        </p>
                        <p>
                          You can opt-out of Bing Ads interest-based ads by
                          following their instructions:{" "}
                          <a
                            href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                            target="_blank"
                          >
                            https://advertise.bingads.
                            <wbr />
                            microsoft.com/en-us/resources/
                            <wbr />
                            policies/personalized-ads
                          </a>
                        </p>
                        <p>
                          You can learn more about the privacy practices and
                          policies of Microsoft by visiting their Privacy Policy
                          page:{" "}
                          <a
                            href="https://privacy.microsoft.com/en-us/PrivacyStatement"
                            target="_blank"
                          >
                            https://privacy.microsoft.com/
                            <wbr />
                            en-us/PrivacyStatement
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Twitter</strong>
                        </p>
                        <p>
                          Twitter remarketing service is provided by Twitter
                          Inc.
                        </p>
                        <p>
                          You can opt-out from Twitter&#39;s interest-based ads
                          by following their instructions:{" "}
                          <a
                            href="https://support.twitter.com/articles/20170405"
                            target="_blank"
                          >
                            https://support.twitter.com/
                            <wbr />
                            articles/20170405
                          </a>
                        </p>
                        <p>
                          You can learn more about the privacy practices and
                          policies of Twitter by visiting their Privacy Policy
                          page:{" "}
                          <a href="https://twitter.com/privacy" target="_blank">
                            https://twitter.com/privacy
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Facebook</strong>
                        </p>
                        <p>
                          Facebook remarketing service is provided by Facebook
                          Inc.
                        </p>
                        <p>
                          You can learn more about interest-based advertising
                          from Facebook by visiting this page:{" "}
                          <a
                            href="https://www.facebook.com/help/164968693837950"
                            target="_blank"
                          >
                            https://www.facebook.com/help/
                            <wbr />
                            164968693837950
                          </a>
                        </p>
                        <p>
                          To opt-out from Facebook&#39;s interest-based ads,
                          follow these instructions from Facebook:{" "}
                          <a
                            href="https://www.facebook.com/help/568137493302217"
                            target="_blank"
                          >
                            https://www.facebook.com/help/
                            <wbr />
                            568137493302217
                          </a>
                          <p>
                            <p>
                              Facebook adheres to the Self-Regulatory Principles
                              for Online Behavioural Advertising established by
                              the Digital Advertising Alliance. You can also
                              opt-out from Facebook and other participating
                              companies through the Digital Advertising Alliance
                              in the USA{" "}
                              <a
                                href="http://www.aboutads.info/choices/"
                                target="_blank"
                              >
                                http://www.aboutads.info/
                                <wbr />
                                choices/
                              </a>
                              , the Digital Advertising Alliance of Canada in
                              Canada{" "}
                              <a
                                href="http://youradchoices.ca/"
                                target="_blank"
                              >
                                http://youradchoices.ca/
                              </a>{" "}
                              or the European Interactive Digital Advertising
                              Alliance in Europe{" "}
                              <a
                                href="http://www.youronlinechoices.eu/"
                                target="_blank"
                              >
                                http://www.youronlinechoices.
                                <wbr />
                                eu/
                              </a>
                              , or opt-out using your mobile device settings.
                            </p>
                            <p>
                              For more information on the privacy practices of
                              Facebook, please visit Facebook&#39;s Data Policy:{" "}
                              <a
                                href="https://www.facebook.com/privacy/explanation"
                                target="_blank"
                              >
                                https://www.facebook.com/
                                <wbr />
                                privacy/explanation
                              </a>
                            </p>
                          </p>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Pinterest</strong>
                        </p>
                        <p>
                          Pinterest remarketing service is provided by Pinterest
                          Inc.
                        </p>
                        <p>
                          You can opt-out from Pinterest&#39;s interest-based
                          ads by enabling the &quot;Do Not Track&quot;
                          functionality of your web browser or by following
                          Pinterest instructions:{" "}
                          <a
                            href="http://help.pinterest.com/en/articles/personalization-and-data"
                            target="_blank"
                          >
                            http://help.pinterest.com/en/
                            <wbr />
                            articles/personalization-and-
                            <wbr />
                            data
                          </a>
                        </p>
                        <p>
                          You can learn more about the privacy practices and
                          policies of Pinterest by visiting their Privacy Policy
                          page:{" "}
                          <a
                            href="https://about.pinterest.com/en/privacy-policy"
                            target="_blank"
                          >
                            https://about.pinterest.com/
                            <wbr />
                            en/privacy-policy
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>AdRoll</strong>
                        </p>
                        <p>
                          AdRoll remarketing service is provided by Semantic
                          Sugar, Inc.
                        </p>
                        <p>
                          You can opt-out of AdRoll remarketing by visiting this
                          AdRoll Advertising Preferences web page:{" "}
                          <a
                            href="http://info.evidon.com/pub_info/573?v=1&amp;nt=1&amp;nw=false"
                            target="_blank"
                          >
                            http://info.evidon.com/pub_
                            <wbr />
                            info/573?v=1&amp;nt=1&amp;nw=false
                          </a>
                        </p>
                        <p>
                          For more information on the privacy practices of
                          AdRoll, please visit the AdRoll Privacy Policy web
                          page:{" "}
                          <a
                            href="http://www.adroll.com/about/privacy"
                            target="_blank"
                          >
                            http://www.adroll.com/about/
                            <wbr />
                            privacy
                          </a>
                        </p>
                      </li>
                    </ul>

                    <h2>Payments</h2>
                    <p>
                      We may provide paid products and/or services within the
                      Service. In that case, we may use third-party services for
                      payment processing (e.g. payment processors).
                    </p>
                    <p>
                      We will not store or collect Your payment card details.
                      That information is provided directly to Our third-party
                      payment processors whose use of Your personal information
                      is governed by their Privacy Policy. These payment
                      processors adhere to the standards set by PCI-DSS as
                      managed by the PCI Security Standards Council, which is a
                      joint effort of brands like Visa, Mastercard, American
                      Express and Discover. PCI-DSS requirements help ensure the
                      secure handling of payment information.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Apple Store In-App Payments</strong>
                        </p>
                        <p>
                          Their Privacy Policy can be viewed at{" "}
                          <a
                            href="https://www.apple.com/legal/privacy/en-ww/"
                            target="_blank"
                          >
                            https://www.apple.com/legal/
                            <wbr />
                            privacy/en-ww/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Google Play In-App Payments</strong>
                        </p>
                        <p>
                          Their Privacy Policy can be viewed at{" "}
                          <a
                            href="https://www.google.com/policies/privacy/"
                            target="_blank"
                          >
                            https://www.google.com/
                            <wbr />
                            policies/privacy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Stripe</strong>
                        </p>
                        <p>
                          Their Privacy Policy can be viewed at{" "}
                          <a
                            href="https://stripe.com/us/privacy"
                            target="_blank"
                          >
                            https://stripe.com/us/privacy
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>WePay</strong>
                        </p>
                        <p>
                          Their Privacy Policy can be viewed at{" "}
                          <a
                            href="https://go.wepay.com/privacy-policy"
                            target="_blank"
                          >
                            https://go.wepay.com/privacy-
                            <wbr />
                            policy
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>PayPal</strong>
                        </p>
                        <p>
                          Their Privacy Policy can be viewed at{" "}
                          <a
                            href="https://www.paypal.com/webapps/mpp/ua/privacy-full"
                            target="_blank"
                          >
                            https://www.paypal.com/
                            <wbr />
                            webapps/mpp/ua/privacy-full
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Square</strong>
                        </p>
                        <p>
                          Their Privacy Policy can be viewed at{" "}
                          <a
                            href="https://squareup.com/legal/privacy-no-account"
                            target="_blank"
                          >
                            https://squareup.com/legal/
                            <wbr />
                            privacy-no-account
                          </a>
                        </p>
                      </li>
                    </ul>

                    <p>
                      When You use Our Service to pay a product and/or service
                      via bank transfer, We may ask You to provide information
                      to facilitate this transaction and to verify Your
                      identity.
                    </p>

                    <h2>Usage, Performance and Miscellaneous</h2>
                    <p>
                      We may use third-party Service Providers to provide better
                      improvement of our Service.
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong>Invisible reCAPTCHA</strong>
                        </p>
                        <p>
                          We use an invisible captcha service named reCAPTCHA.
                          reCAPTCHA is operated by Google.
                        </p>
                        <p>
                          The reCAPTCHA service may collect information from You
                          and from Your Device for security purposes.
                        </p>
                        <p>
                          The information gathered by reCAPTCHA is held in
                          accordance with the Privacy Policy of Google:{" "}
                          <a
                            href="https://www.google.com/intl/en/policies/privacy/"
                            target="_blank"
                          >
                            https://www.google.com/intl/
                            <wbr />
                            en/policies/privacy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Mouseflow</strong>
                        </p>
                        <p>
                          Mouseflow is a session replay and heatmap tool that
                          shows how visitors click, move, scroll, browse, and
                          pay attention on websites. The service is operated by
                          ApS.
                        </p>
                        <p>
                          Mouseflow service may collect information from Your
                          device.
                        </p>
                        <p>
                          The information gathered by Mouseflow is held in
                          accordance with its Privacy Policy:{" "}
                          <a
                            href="https://mouseflow.com/privacy/"
                            target="_blank"
                          >
                            https://mouseflow.com/privacy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>FreshDesk</strong>
                        </p>
                        <p>
                          FreshDesk is a customer support software. The service
                          is operated by Freshworks, Inc.
                        </p>
                        <p>
                          FreshDesk service may collect information from Your
                          Device.
                        </p>
                        <p>
                          The information gathered by FreshDesk is held in
                          accordance with its Privacy Policy:{" "}
                          <a
                            href="https://www.freshworks.com/privacy/"
                            target="_blank"
                          >
                            https://www.freshworks.com/
                            <wbr />
                            privacy/
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Google Places</strong>
                        </p>
                        <p>
                          Google Places is a service that returns information
                          about places using HTTP requests. It is operated by
                          Google.
                        </p>
                        <p>
                          Google Places service may collect information from You
                          and from Your Device for security purposes.
                        </p>
                        <p>
                          The information gathered by Google Places is held in
                          accordance with the Privacy Policy of Google:{" "}
                          <a
                            href="https://www.google.com/intl/en/policies/privacy/"
                            target="_blank"
                          >
                            https://www.google.com/intl/
                            <wbr />
                            en/policies/privacy/
                          </a>
                        </p>
                      </li>
                    </ul>

                    <h1>GDPR Privacy</h1>
                    <h2>Legal Basis for Processing Personal Data under GDPR</h2>
                    <p>
                      We may process Personal Data under the following
                      conditions:
                    </p>

                    <ul>
                      <li>
                        <strong>Consent:</strong> You have given Your consent
                        for processing Personal Data for one or more specific
                        purposes.
                      </li>
                      <li>
                        <strong>Performance of a contract:</strong> Provision of
                        Personal Data is necessary for the performance of an
                        agreement with You and/or for any pre-contractual
                        obligations thereof.
                      </li>
                      <li>
                        <strong>Legal obligations:</strong> Processing Personal
                        Data is necessary for compliance with a legal obligation
                        to which the Company is subject.
                      </li>
                      <li>
                        <strong>Vital interests:</strong> Processing Personal
                        Data is necessary in order to protect Your vital
                        interests or of another natural person.
                      </li>
                      <li>
                        <strong>Public interests:</strong> Processing Personal
                        Data is related to a task that is carried out in the
                        public interest or in the exercise of official authority
                        vested in the Company.
                      </li>
                      <li>
                        <strong>Legitimate interests:</strong> Processing
                        Personal Data is necessary for the purposes of the
                        legitimate interests pursued by the Company.
                      </li>
                    </ul>
                    <p>
                      In any case, the Company will gladly help to clarify the
                      specific legal basis that applies to the processing, and
                      in particular whether the provision of Personal Data is a
                      statutory or contractual requirement, or a requirement
                      necessary to enter into a contract.
                    </p>

                    <h2>Your Rights under the GDPR</h2>
                    <p>
                      The Company undertakes to respect the confidentiality of
                      Your Personal Data and to guarantee You can exercise Your
                      rights.
                    </p>
                    <p>
                      You have the right under this Privacy Policy, and by law
                      if You are within the EU, to:
                    </p>

                    <ul>
                      <li>
                        <strong>Request access to Your Personal Data.</strong>{" "}
                        The right to access, update or delete the information We
                        have on You. Whenever made possible, you can access,
                        update or request deletion of Your Personal Data
                        directly within Your account settings section. If you
                        are unable to perform these actions yourself, please
                        contact Us to assist You. This also enables You to
                        receive a copy of the Personal Data We hold about You.
                      </li>
                      <li>
                        <strong>
                          Request correction of the Personal Data that We hold
                          about You.
                        </strong>{" "}
                        You have the right to to have any incomplete or
                        inaccurate information We hold about You corrected.
                      </li>
                      <li>
                        <strong>
                          Object to processing of Your Personal Data.
                        </strong>{" "}
                        This right exists where We are relying on a legitimate
                        interest as the legal basis for Our processing and there
                        is something about Your particular situation, which
                        makes You want to object to our processing of Your
                        Personal Data on this ground. You also have the right to
                        object where We are processing Your Personal Data for
                        direct marketing purposes.
                      </li>
                      <li>
                        <strong>Request erasure of Your Personal Data.</strong>{" "}
                        You have the right to ask Us to delete or remove
                        Personal Data when there is no good reason for Us to
                        continue processing it.
                      </li>
                      <li>
                        <strong>
                          Request the transfer of Your Personal Data.
                        </strong>{" "}
                        We will provide to You, or to a third-party You have
                        chosen, Your Personal Data in a structured, commonly
                        used, machine-readable format. Please note that this
                        right only applies to automated information which You
                        initially provided consent for Us to use or where We
                        used the information to perform a contract with You.
                      </li>
                      <li>
                        <strong>Withdraw Your consent.</strong> You have the
                        right to withdraw Your consent on using your Personal
                        Data. If You withdraw Your consent, We may not be able
                        to provide You with access to certain specific
                        functionalities of the Service.
                      </li>
                    </ul>

                    <h2>Exercising of Your GDPR Data Protection Rights</h2>
                    <p>
                      You may exercise Your rights of access, rectification,
                      cancellation and opposition by contacting Us. Please note
                      that we may ask You to verify Your identity before
                      responding to such requests. If You make a request, We
                      will try our best to respond to You as soon as possible.
                    </p>
                    <p>
                      You have the right to complain to a Data Protection
                      Authority about Our collection and use of Your Personal
                      Data. For more information, if You are in the European
                      Economic Area (EEA), please contact Your local data
                      protection authority in the EEA.
                    </p>

                    <h1>Facebook Fan Page</h1>
                    <h2>Data Controller for the Facebook Fan Page</h2>
                    <p>
                      The Company is the Data Controller of Your Personal Data
                      collected while using the Service. As operator of the
                      Facebook Fan Page (
                      <a
                        href="https://www.facebook.com/Findfunofficial/?modal=admin_todo_tour"
                        target="_blank"
                      >
                        https://www.facebook.com/
                        <wbr />
                        Findfunofficial/?modal=admin_
                        <wbr />
                        todo_tour
                      </a>
                      ), the Company and the operator of the social network
                      Facebook are Joint Controllers.
                    </p>
                    <p>
                      The Company has entered into agreements with Facebook that
                      define the terms for use of the Facebook Fan Page, among
                      other things. These terms are mostly based on the Facebook
                      Terms of Service:{" "}
                      <a
                        href="https://www.facebook.com/terms.php"
                        target="_blank"
                      >
                        https://www.facebook.com/
                        <wbr />
                        terms.php
                      </a>
                    </p>
                    <p>
                      Visit the Facebook Privacy Policy{" "}
                      <a
                        href="https://www.facebook.com/policy.php"
                        target="_blank"
                      >
                        https://www.facebook.com/
                        <wbr />
                        policy.php
                      </a>{" "}
                      for more information about how Facebook manages Personal
                      data or contact Facebook online, or by mail: Facebook,
                      Inc. ATTN, Privacy Operations, 1601 Willow Road, Menlo
                      Park, CA 94025, United States.
                    </p>

                    <h2>Facebook Insights</h2>
                    <p>
                      We use the Facebook Insights function in connection with
                      the operation of the Facebook Fan Page and on the basis of
                      the GDPR, in order to obtain anonymized statistical data
                      about Our users.
                    </p>
                    <p>
                      For this purpose, Facebook places a Cookie on the device
                      of the user visiting Our Facebook Fan Page. Each Cookie
                      contains a unique identifier code and remains active for a
                      period of two years, except when it is deleted before the
                      end of this period.
                    </p>
                    <p>
                      Facebook receives, records and processes the information
                      stored in the Cookie, especially when the user visits the
                      Facebook services, services that are provided by other
                      members of the Facebook Fan Page and services by other
                      companies that use Facebook services.
                    </p>
                    <p>
                      For more information on the privacy practices of Facebook,
                      please visit Facebook Privacy Policy here:{" "}
                      <a
                        href="https://www.facebook.com/full_data_use_policy"
                        target="_blank"
                      >
                        https://www.facebook.com/full_
                        <wbr />
                        data_use_policy
                      </a>
                    </p>

                    <h1>CCPA Privacy</h1>
                    <h2>Your Rights under the CCPA</h2>
                    <p>
                      Under this Privacy Policy, and by law if You are a
                      resident of California, You have the following rights:
                    </p>
                    <ul>
                      <li>
                        <strong>The right to notice.</strong> You must be
                        properly notified which categories of Personal Data are
                        being collected and the purposes for which the Personal
                        Data is being used.
                      </li>
                      <li>
                        <strong>
                          The right to access / the right to request.
                        </strong>{" "}
                        The CCPA permits You to request and obtain from the
                        Company information regarding the disclosure of Your
                        Personal Data that has been collected in the past 12
                        months by the Company or its subsidiaries to a
                        third-party for the third party&#39;s direct marketing
                        purposes.
                      </li>
                      <li>
                        <strong>
                          The right to say no to the sale of Personal Data.
                        </strong>{" "}
                        You also have the right to ask the Company not to sell
                        Your Personal Data to third parties. You can submit such
                        a request by visiting our &quot;Do Not Sell My Personal
                        Information&quot; section or web page.
                      </li>
                      <li>
                        <p>
                          <strong>
                            The right to know about Your Personal Data.
                          </strong>{" "}
                          You have the right to request and obtain from the
                          Company information regarding the disclosure of the
                          following:
                        </p>
                        <ul>
                          <li>The categories of Personal Data collected</li>
                          <li>
                            The sources from which the Personal Data was
                            collected
                          </li>
                          <li>
                            The business or commercial purpose for collecting or
                            selling the Personal Data
                          </li>
                          <li>
                            Categories of third parties with whom We share
                            Personal Data
                          </li>
                          <li>
                            The specific pieces of Personal Data we collected
                            about You
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>The right to delete Personal Data.</strong> You
                        also have the right to request the deletion of Your
                        Personal Data that have been collected in the past 12
                        months.
                      </li>
                      <li>
                        <p>
                          <strong>
                            The right not to be discriminated against.
                          </strong>{" "}
                          You have the right not to be discriminated against for
                          exercising any of Your Consumer&#39;s rights,
                          including by:
                        </p>
                        <ul>
                          <li>Denying goods or services to You</li>
                          <li>
                            Charging different prices or rates for goods or
                            services, including the use of discounts or other
                            benefits or imposing penalties
                          </li>
                          <li>
                            Providing a different level or quality of goods or
                            services to You
                          </li>
                          <li>
                            Suggesting that You will receive a different price
                            or rate for goods or services or a different level
                            or quality of goods or services.
                          </li>
                        </ul>
                      </li>
                    </ul>

                    <h2>Exercising Your CCPA Data Protection Rights</h2>
                    <p>
                      In order to exercise any of Your rights under the CCPA,
                      and if you are a California resident, You can email or
                      call us or visit our &quot;Do Not Sell My Personal
                      Information&quot; section or web page.
                    </p>
                    <p>
                      The Company will disclose and deliver the required
                      information free of charge within 45 days of receiving
                      Your verifiable request. The time period to provide the
                      required information may be extended once by an additional
                      45 days when reasonable necessary and with prior notice.
                    </p>

                    <h2>Do Not Sell My Personal Information</h2>
                    <p>
                      We do not sell personal information. However, the Service
                      Providers we partner with (for example, our advertising
                      partners) may use technology on the Service that
                      &quot;sells&quot; personal information as defined by the
                      CCPA law.
                    </p>
                    <p>
                      If you wish to opt out of the use of your personal
                      information for interest-based advertising purposes and
                      these potential sales as defined under CCPA law, you may
                      do so by following the instructions below.
                    </p>
                    <p>
                      Please note that any opt out is specific to the browser
                      You use. You may need to opt out on every browser that you
                      use.
                    </p>

                    <h3>Website</h3>
                    <p>
                      You can opt out of receiving ads that are personalized as
                      served by our Service Providers by following our
                      instructions presented on the Service:
                    </p>
                    <ul>
                      <li>From Our &quot;Cookie Consent&quot; notice banner</li>
                      <li>
                        Or from Our &quot;CCPA Opt-out&quot; notice banner
                      </li>
                      <li>
                        Or from Our &quot;Do Not Sell My Personal
                        Information&quot; notice banner
                      </li>
                      <li>
                        Or from Our &quot;Do Not Sell My Personal
                        Information&quot; link
                      </li>
                    </ul>
                    <p>
                      The opt out will place a cookie on Your computer that is
                      unique to the browser You use to opt out. If you change
                      browsers or delete the cookies saved by your browser, you
                      will need to opt out again.
                    </p>

                    <h3>Mobile Devices</h3>
                    <p>
                      Your mobile device may give you the ability to opt out of
                      the use of information about the apps you use in order to
                      serve you ads that are targeted to your interests:
                    </p>
                    <ul>
                      <li>
                        &quot;Opt out of Interest-Based Ads&quot; or &quot;Opt
                        out of Ads Personalization&quot; on Android devices
                      </li>
                      <li>&quot;Limit Ad Tracking&quot; on iOS devices</li>
                    </ul>
                    <p>
                      You can also stop the collection of location information
                      from Your mobile device by changing the preferences on
                      your mobile device.
                    </p>

                    <h1>
                      &quot;Do Not Track&quot; Policy as Required by California
                      Online Privacy Protection Act (CalOPPA)
                    </h1>
                    <p>Our Service does not respond to Do Not Track signals.</p>
                    <p>
                      However, some third party websites do keep track of Your
                      browsing activities. If You are visiting such websites,
                      You can set Your preferences in Your web browser to inform
                      websites that You do not want to be tracked. You can
                      enable or disable DNT by visiting the preferences or
                      settings page of Your web browser.
                    </p>

                    <h1>Children&#39;s Privacy</h1>
                    <p>
                      The Service may contain content appropriate for children
                      under the age of 13. As a parent, you should know that
                      through the Service children under the age of 13 may
                      participate in activities that involve the collection or
                      use of personal information. We use reasonable efforts to
                      ensure that before we collect any personal information
                      from a child, the child&#39;s parent receives notice of
                      and consents to our personal information practices.
                    </p>
                    <p>
                      We also may limit how We collect, use, and store some of
                      the information of Users between 13 and 18 years old. In
                      some cases, this means We will be unable to provide
                      certain functionality of the Service to these Users. If We
                      need to rely on consent as a legal basis for processing
                      Your information and Your country requires consent from a
                      parent, We may require Your parent&#39;s consent before We
                      collect and use that information.
                    </p>
                    <p>
                      We may ask a User to verify its date of birth before
                      collecting any personal information from them. If the User
                      is under the age of 13, the Service will be either blocked
                      or redirected to a parental consent process.
                    </p>

                    <h2>
                      Information Collected from Children Under the Age of 13
                    </h2>
                    <p>
                      The Company may collect and store persistent identifiers
                      such as cookies or IP addresses from Children without
                      parental consent for the purpose of supporting the
                      internal operation of the Service.
                    </p>
                    <p>
                      We may collect and store other personal information about
                      children if this information is submitted by a child with
                      prior parent consent or by the parent or guardian of the
                      child.
                    </p>
                    <p>
                      The Company may collect and store the following types of
                      personal information about a child when submitted by a
                      child with prior parental consent or by the parent or
                      guardian of the child:
                    </p>
                    <ul>
                      <li>First and/or last name</li>
                      <li>Date of birth</li>
                      <li>Gender</li>
                      <li>Grade level</li>
                      <li>Email address</li>
                      <li>Telephone number</li>
                      <li>Parent&#39;s or guardian&#39;s name</li>
                      <li>Parent&#39;s or guardian&#39;s email address</li>
                    </ul>
                    <p>
                      For further details on the information We might collect,
                      You can refer to the &quot;Types of Data Collected&quot;
                      section of this Privacy Policy. We follow our standard
                      Privacy Policy for the disclosure of personal information
                      collected from and about children.
                    </p>

                    <h2>Parental Access</h2>
                    <p>
                      A parent who has already given the Company permission to
                      collect and use his child personal information can, at any
                      time:
                    </p>
                    <ul>
                      <li>
                        Review, correct or delete the child&#39;s personal
                        information
                      </li>
                      <li>
                        Discontinue further collection or use of the child&#39;s
                        personal information
                      </li>
                    </ul>
                    <p>
                      To make such a request, You can write to Us using the
                      contact information provided in this Privacy Policy.
                    </p>

                    <h1>
                      Your California Privacy Rights (California&#39;s Shine the
                      Light law)
                    </h1>
                    <p>
                      Under California Civil Code Section 1798 (California&#39;s
                      Shine the Light law), California residents with an
                      established business relationship with us can request
                      information once a year about sharing their Personal Data
                      with third parties for the third parties&#39; direct
                      marketing purposes.
                    </p>
                    <p>
                      If you&#39;d like to request more information under the
                      California Shine the Light law, You can contact Us using
                      the contact information provided below.
                    </p>

                    <h1>
                      California Privacy Rights for Minor Users (California
                      Business and Professions Code Section 22581)
                    </h1>
                    <p>
                      California Business and Professions Code section 22581
                      allow California residents under the age of 18 who are
                      registered users of online sites, services or applications
                      to request and obtain removal of content or information
                      they have publicly posted.
                    </p>
                    <p>
                      To request removal of such data, and if you are a
                      California resident, You can contact Us using the contact
                      information provided below, and include the email address
                      associated with Your account.
                    </p>
                    <p>
                      Be aware that Your request does not guarantee complete or
                      comprehensive removal of content or information posted
                      online and that the law may not permit or require removal
                      in certain circumstances.
                    </p>

                    <h1>Links to Other Websites</h1>
                    <p>
                      Our Service may contain links to other websites that are
                      not operated by Us. If You click on a third party link,
                      You will be directed to that third party&#39;s site. We
                      strongly advise You to review the Privacy Policy of every
                      site You visit.
                    </p>
                    <p>
                      We have no control over and assume no responsibility for
                      the content, privacy policies or practices of any third
                      party sites or services.
                    </p>

                    <h1>Changes to this Privacy Policy</h1>
                    <p>
                      We may update our Privacy Policy from time to time. We
                      will notify You of any changes by posting the new Privacy
                      Policy on this page.
                    </p>
                    <p>
                      We will let You know via email and/or a prominent notice
                      on Our Service, prior to the change becoming effective and
                      update the &quot;Last updated&quot; date at the top of
                      this Privacy Policy.
                    </p>
                    <p>
                      You are advised to review this Privacy Policy periodically
                      for any changes. Changes to this Privacy Policy are
                      effective when they are posted on this page.
                    </p>

                    <h1>Contact Us</h1>
                    <p>
                      If you have any questions about this Privacy Policy, You
                      can contact us:
                    </p>
                    <ul>
                      <li>
                        By email:{" "}
                        <a href="mailto:jtocamd@gmail.com" target="_blank">
                          jtocamd@gmail.com
                        </a>
                      </li>
                      <li>
                        By visiting this page on our website:{" "}
                        <a href="http://findfun.com" target="_blank">
                          findfun.com
                        </a>
                      </li>
                    </ul>
                  </>
                )}
                {active === 3 && (
                  <>
                    <Formik
                      initialValues={{}}
                      // validate={validation}
                      // onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        isValidating,
                        setFieldValue,
                        /* and other goodies */
                      }) => (
                        <>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <TextField
                                id="outlined-basic"
                                label="First Name"
                                variant="filled"
                                className="mb-4 bg-light-theme w-100"
                                // disabled={values.isPasswordShown}
                                required
                                // error={
                                //   errors.location && touched.location && errors.location
                                // }
                                // fullWidth
                                // helperText={
                                //   errors.location && touched.location && errors.location
                                // }
                                // onChange={(e) => setFieldValue("location", e.target.value)}
                                // onBlur={handleBlur}
                                // value={values.location}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <TextField
                                id="outlined-basic"
                                label="Last Name"
                                variant="filled"
                                className="mb-4 bg-light-theme w-100"
                                // disabled={values.isPasswordShown}
                                required
                                // error={
                                //   errors.location && touched.location && errors.location
                                // }
                                // fullWidth
                                // helperText={
                                //   errors.location && touched.location && errors.location
                                // }
                                // onChange={(e) => setFieldValue("location", e.target.value)}
                                // onBlur={handleBlur}
                                // value={values.location}
                              />
                            </div>
                            <div className="col-12">
                              <TextField
                                id="outlined-basic"
                                label="Email"
                                type="email"
                                variant="filled"
                                className="mb-4 bg-light-theme w-100"
                                // disabled={values.isPasswordShown}
                                required
                                // error={
                                //   errors.location && touched.location && errors.location
                                // }
                                // fullWidth
                                // helperText={
                                //   errors.location && touched.location && errors.location
                                // }
                                // onChange={(e) => setFieldValue("location", e.target.value)}
                                // onBlur={handleBlur}
                                // value={values.location}
                              />
                            </div>
                            <div className="col-12">
                              {/* <TextField
                                id="outlined-basic"
                                label="Event URL"
                                variant="filled"
                                className="mb-4 bg-light-theme w-100"
                                // disabled={values.isPasswordShown}
                                required
                                // error={
                                //   errors.location && touched.location && errors.location
                                // }
                                // fullWidth
                                // helperText={
                                //   errors.location && touched.location && errors.location
                                // }
                                // onChange={(e) => setFieldValue("location", e.target.value)}
                                // onBlur={handleBlur}
                                // value={values.location}
                              /> */}
                            </div>
                            <div className="col-12">
                              <TextField
                                id="outlined-basic"
                                label="Subject"
                                variant="filled"
                                className="mb-4 bg-light-theme w-100"
                                // disabled={values.isPasswordShown}
                                required
                                // error={
                                //   errors.location && touched.location && errors.location
                                // }
                                // fullWidth
                                // helperText={
                                //   errors.location && touched.location && errors.location
                                // }
                                // onChange={(e) => setFieldValue("location", e.target.value)}
                                // onBlur={handleBlur}
                                // value={values.location}
                              />
                            </div>
                            <div className="col-12">
                              <TextField
                                id="outlined-basic"
                                label="Message"
                                multiline
                                variant="filled"
                                className="mb-4 bg-light-theme w-100 text-white"
                                // disabled={values.isPasswordShown}
                                required
                                // error={
                                //   errors.location && touched.location && errors.location
                                // }
                                // fullWidth
                                // helperText={
                                //   errors.location && touched.location && errors.location
                                // }
                                // onChange={(e) => setFieldValue("location", e.target.value)}
                                // onBlur={handleBlur}
                                // value={values.location}
                              />
                            </div>

                            <div className="col-12 text-right">
                              <Button
                                onClick={handleSubmit}
                                // disabled={loading}
                                color="primary"
                              >
                                Submit
                                {/* {loading ? <CircularProgress /> : "Create"}{" "} */}
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </Formik>
                  </>
                )}
                {active === 4 && (
                  <>
                    <p className="text-center">
                      {" "}
                      <i>
                        There&#39;s a world, like yours, where you journey to
                        the most fun activities you can dream
                      </i>
                    </p>

                    <p>
                      up in your mind - and we know you have some great dreams.
                    </p>

                    <p>
                      At FindFun, you can discover like-minded new people or
                      connect with your friends to find activities and chat
                      groups that interest you. Imagine any hobby you love, and
                      there&#39;s bound to be a community out there who shares
                      your interests! Findfun allows users to browse, create,
                      and promote local events and chat groups in your area.
                      Organize online groups and meet in person based on your
                      interests
                    </p>
                    <p>FindFun connects you to them.</p>
                    <ul>
                      <li>
                        Never have a dull weekend again - Do you enjoy parties?
                        With balloons? And jumping castles? And wine? It&#39;s
                        peculiar to be that specific, but FindFun will connect
                        you to the best &#39;Balloon Jumping Castle Wine
                        Parties&#39; out there.
                      </li>
                      <li>
                        Dance into a new world - Find the dancing groups for
                        you; learn a new dance, or meet friends to start a dance
                        group.
                      </li>
                      <li>
                        Never strike out - Always have a group lined up to see
                        your favorite baseball or basketball games.
                      </li>
                      <li>
                        Book the date - Arrange the next book club with your new
                        reading group buddies!
                      </li>
                      <li>
                        Breakfast club - Who doesn&#39;t love a good brunch
                        these days? Find your new brunch clique and share your
                        passion for avocado on toast.
                      </li>
                      <li>
                        {" "}
                        Bark up the right tree - meet new dog-loving friends at
                        the park (even if you&#39;re just trying to make friends
                        with the dogs, we won&#39;t judge).
                      </li>
                    </ul>

                    <p>
                      <i>
                        Whatever hobby you have, there&#39;s someone who shares
                        your passion...
                      </i>
                    </p>

                    <p>
                      If you are into fishing, find a group of fishing friends
                      and plan your next adventure. You may be into film,
                      painting, drawing, rock climbing, cycling, wine-tasting,
                      board gaming, or anything possibly imaginable!
                    </p>
                    <p>
                      You have no reason to be bored again now you can Findfun.
                      So get out there and Findfun!
                    </p>

                    <p>
                      <b>find friends&#39; &#39;Find fun</b>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.User.data,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
