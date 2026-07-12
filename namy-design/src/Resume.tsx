import { useEffect } from 'react';
import './Resume.css';

declare global {
  interface Window {
    jsFileDownloader: any;
  }
}

export default function Resume() {
  useEffect(() => {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', handleDownload);
    }
    return () => {
      if (downloadBtn) {
        downloadBtn.removeEventListener('click', handleDownload);
      }
    };
  }, []);

  const handleDownload = () => {
    if (window.jsFileDownloader) {
      new window.jsFileDownloader({
        url: '/assets/pdf/Namrata_Jaiswal_Product_Designer_Resume.pdf',
      })
        .then(() => {
          console.log('Download Done!');
        })
        .catch(() => {
          console.log('Download Error!');
        });
    }
  };

  return (
    <>
      <div className="resume-download" id="download-btn">
        <img
          src="/assets/images/resume_arrow.svg"
          alt="download"
          style={{ transform: 'rotate(225deg)' }}
        />
        <div id="resume-btn-text">DOWNLOAD</div>
      </div>

      <div className="resume-container">
        <div className="resume-timeline">
          <img src="/assets/images/dp.svg" className="resume-dp" alt="profile" />
          <div className="timeline-details">
            <div className="timeline-name">Namrata Jaiswal</div>
            <div className="timeline-jd">Product Designer in India</div>
            <a
              href="https://namy.design"
              style={{ textDecoration: 'none', width: 'fit-content' }}
              target="_blank"
              rel="noreferrer"
            >
              <div className="timeline-web-url">
                namy.design
                <img
                  src="/assets/images/resume-page-arrow.svg"
                  style={{ marginLeft: '2px' }}
                  alt="arrow"
                />
              </div>
            </a>
          </div>
        </div>

        <div className="resume-heading">About</div>
        <div className="resume-text">
          A creative person on the verge of technology, design & fashion. Following design experiences
          in the Fashion Industry I ventured into the design realm of tech. <br />
          Striving to balance Art and Usability in crafting high-quality digital experiences.
        </div>

        <div className="resume-heading">Work Experience</div>

        <div className="resume-content-container">
          <div className="resume-title-content">Dec'24 - Present</div>
          <div className="resume-content">
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              Product Designer
            </div>
            <a
              href="https://ionic.money"
              className="resume-company-link"
              target="_blank"
              rel="noreferrer"
            >
              Ionic Wealth by AngelOne{' '}
              <img src="/assets/images/resume-arrow-small.svg" alt="arrow" />
            </a>
            <div className="resume-company-link">
              Skills: Figma, User Research, Design Systems, Prototyping with Claude, Interaction
              Design, Motion Design, Midjourney
            </div>
            <ul className="resume-experience-list">
              <li className="resume-list-item">
                Conceptualised the design of <span className="resume-highlight-text">
                  Portfolio Gap Analyser,
                </span>{' '}
                an{' '}
                <span className="resume-highlight-text">
                  AI-powered conversational chat flow
                </span>{' '}
                within the app translating complex portfolio analysis into an interactive,{' '}
                <span className="resume-highlight-text">
                  personalised experience that guided users toward actionable investment decisions
                </span>
              </li>
              <li className="resume-list-item">
                Redesigned the{' '}
                <span className="resume-highlight-text">Onboarding Journey</span> (Client App + RM
                App Web + RM App Mob), giving users control over their profile inputs post-signup and{' '}
                <span className="resume-highlight-text">reducing friction at the activation stage</span>
              </li>
              <li className="resume-list-item">
                Owned end-to-end design of the{' '}
                <span className="resume-highlight-text">
                  Accredited Investor qualification flow
                </span>{' '}
                (Client App + RM App Web), streamlining a high-stakes compliance journey into a
                smooth,{' '}
                <span className="resume-highlight-text">
                  guided experience for HNI users
                </span>
              </li>
              <li className="resume-list-item">
                Designed <span className="resume-highlight-text">Global Search</span>, enabling
                users to find investments, features, and content across the app from a single entry
                point
              </li>
              <li className="resume-list-item">
                Built the <span className="resume-highlight-text">Design System from scratch</span> —
                foundations, tokens, and variables. And led a{' '}
                <span className="resume-highlight-text">subsequent Design System Revamp</span> when
                AI-assisted development began creating significant component duplicity and visual
                inconsistency; worked closely with dev to{' '}
                <span className="resume-highlight-text">
                  resolve deep-rooted color discrepancies in existing code
                </span>
                ,{' '}
                <span className="resume-highlight-text">
                  aligning implementation with design tokens
                </span>{' '}
                and establishing a single source of truth across 2 product surfaces and 3 designers
              </li>
              <li className="resume-list-item">
                Delivered the <span className="resume-highlight-text">Ionic Website</span>{' '}
                end-to-end within 2 months, spanning the landing page, compliance pages, and all
                supporting sections,{' '}
                <span className="resume-highlight-text">
                  coordinating inputs from multiple stakeholders across the organisation
                </span>
                ; the landing section went through multiple iterations as aligning varied stakeholder
                visions into a single cohesive visual and storytelling direction was a major design
                challenge
              </li>
              <li className="resume-list-item">
                Crafted the{' '}
                <span className="resume-highlight-text">
                  Choose Your Co-Founder flow & webpage
                </span>{' '}
                across the Client App and main website, one of the company's biggest campaigns and
                navigated competing briefs from product and marketing teams to arrive at two
                entirely separate pages,{' '}
                <span className="resume-highlight-text">
                  Portfolio Assessment & Portfolio Streamliner
                </span>
                , and the <span className="resume-highlight-text">SIF webpage</span>, each designed
                across mob, tab, and web to serve its own distinct narrative
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">
                  Templatized the SEO Pages layout
                </span>{' '}
                across 40 distinct pages and{' '}
                <span className="resume-highlight-text">
                  defined a visual brand identity
                </span>{' '}
                to be followed across all web touchpoints — bringing cohesiveness to a surface that
                had none, at a time when the entire app was simultaneously undergoing an agentic
                revamp with a new visual identity; the system and direction were{' '}
                <span className="resume-highlight-text">
                  recognised and appreciated by stakeholders
                </span>
              </li>
              <li className="resume-list-item">
                Collaborated on exploring the app{' '}
                <span className="resume-highlight-text">Rethinking App UX</span> project to come up
                with a more agentic app UX with an entirely new design language
              </li>
              <li className="resume-list-item">
                Designed on{' '}
                <span className="resume-highlight-text">
                  Angelone × Ionic & Jupiter × Ionic integration
                </span>{' '}
                design work, translating each brand's visual identity into cohesive co-branded
                experiences while maintaining Ionic's design language
              </li>
            </ul>
          </div>
        </div>

        <div className="resume-content-container">
          <div className="resume-title-content">Jan'23 - Jan'24</div>
          <div className="resume-content">
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              Product Designer 2
            </div>
            <a
              href="https://flobiz.in/"
              className="resume-company-link"
              target="_blank"
              rel="noreferrer"
            >
              Flobiz <img src="/assets/images/resume-arrow-small.svg" alt="arrow" />
            </a>
            <div className="resume-company-link">
              Skills: Figma, Adobe Creative Suite, User Research, Prototyping, Wireframing,
              Interaction Design, Motion Design, Illustrations, Design System
            </div>
            <ul className="resume-experience-list">
              <li className="resume-list-item">
                <span className="resume-highlight-text">Honoured</span> with the{' '}
                <span className="resume-highlight-text">Cultural Award</span> for{' '}
                <span className="resume-highlight-text">Focus on Delivering Results</span> in Q3
                2023,{' '}
                <span className="resume-highlight-text">
                  recognised personally by the founders for exceptional dedication
                </span>{' '}
                to achieving key outcomes
              </li>
              <li className="resume-list-item">
                Developed a <span className="resume-highlight-text">Centralised Design System</span>{' '}
                from the scratch, effectively{' '}
                <span className="resume-highlight-text">elevating team efficiency</span> and{' '}
                <span className="resume-highlight-text">ensuring design coherence</span> across our
                entire product suite
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">
                  Spearheaded the redesign of entire Web Application
                </span>
                . Drawn on the learnings of the Web App User Experience Research in which I played
                an instrumental role. This effort has{' '}
                <span className="resume-highlight-text">
                  led to a 7% increase in user activation
                </span>
                , a <span className="resume-highlight-text">15% increase in click-through rates (CTR)</span>{' '}
                for "create" call-to-action (CTA) buttons, and a{' '}
                <span className="resume-highlight-text">
                  25% increase in the discovery of deeper features
                </span>{' '}
                by users.
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">
                  Crafted Sophisticated GST Compliance Features
                </span>
                , including e-invoice and e-way bill generation for Android/ iOS apps, exclusive to
                the enterprise plan.{' '}
                <span className="resume-highlight-text">Adopted by</span> over{' '}
                <span className="resume-highlight-text">5,000 businesses</span>, leading to a 10%
                boost in enterprise plan revenue.
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">Revamped</span> the GST Partner{' '}
                <span className="resume-highlight-text">(GSP) Registration Process</span>, simplifying
                the user journey, leading to a{' '}
                <span className="resume-highlight-text">
                  31% increase in successful registrations
                </span>
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">Pioneered</span> the design of an{' '}
                <span className="resume-highlight-text">AI-Based Bill & Item Import System</span>,
                which <span className="resume-highlight-text">enhanced user activation metrics</span>,
                achieving a notable{' '}
                <span className="resume-highlight-text">
                  12% increase in users generating 3 invoices
                </span>{' '}
                within the{' '}
                <span className="resume-highlight-text">first 5 days of registration</span>
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">Redesigned</span> the{' '}
                <span className="resume-highlight-text">Bulk Upload Feature</span> on the Web
                Platform,{' '}
                <span className="resume-highlight-text">
                  transitioning from traditional Excel uploads to an integrated Google Sheets-style
                  interface
                </span>
                . This change has facilitated direct, in-app inventory imports, resulting in an{' '}
                <span className="resume-highlight-text">14% increase in bulk imports</span>
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">
                  Led the Design of the User Role Customisation Feature
                </span>{' '}
                on both Web and Mobile platforms. This critical upgrade has{' '}
                <span className="resume-highlight-text">improved user retention</span> by{' '}
                <span className="resume-highlight-text">enabling more personalised</span> and{' '}
                <span className="resume-highlight-text">secure user access controls</span>, showcasing
                a deep understanding of user needs and security concerns
              </li>
            </ul>
          </div>
        </div>

        <div className="resume-content-container">
          <div className="resume-title-content">Sep'21- Dec'22</div>
          <div className="resume-content">
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              Associate Product Designer
            </div>
            <a
              href="https://www.figma.com/proto/XbiIH4ExzdDg0BxdrAMG9i/Goldsetu-%7C-Sep--21---Dec--22?node-id=1369-29643&viewport=1090%2C3467%2C0.36&t=k1z3Ca7fCYyGOEnO-1&scaling=min-zoom&content-scaling=fixed&page-id=1369%3A7581"
              className="resume-company-link"
              target="_blank"
              rel="noreferrer"
            >
              Goldsetu <img src="/assets/images/resume-arrow-small.svg" alt="arrow" />
            </a>
            <div className="resume-company-link">
              Skills: User Research, Prototyping, Wireframing, Interaction Design, Motion Design,
              Illustrations, Design System
            </div>
            <ul className="resume-experience-list">
              <li className="resume-list-item">
                Acquired <span className="resume-highlight-text">complete ownership</span> of the{' '}
                <span className="resume-highlight-text">customer facing PWA</span> pivotal to our core
                users, the jewellers. This encompassed the designing and implementation of the{' '}
                <span className="resume-highlight-text">Landing Page</span> & other features like{' '}
                <span className="resume-highlight-text">Orders Flow</span>,{' '}
                <span className="resume-highlight-text">Saving Plans</span>, and{' '}
                <span className="resume-highlight-text">Digital Gold</span>
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">Collaborated</span> on designing the{' '}
                <span className="resume-highlight-text">marketing website</span> for Goldsetu with a
                senior designer
              </li>
              <li className="resume-list-item">
                Produced the <span className="resume-highlight-text">product's explanatory videos</span>{' '}
                for company's <span className="resume-highlight-text">Youtube channel</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="resume-content-container">
          <div className="resume-title-content">Nov'21- Jan'22</div>
          <div className="resume-content">
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              Multi Disciplinary Designer | Freelance
            </div>
            <a
              href="https://www.behance.net/gallery/142349013/Doctors-Appointment-Booking-App"
              className="resume-company-link"
              target="_blank"
              rel="noreferrer"
            >
              Bytflakes, Medical Solution{' '}
              <img src="/assets/images/resume-arrow-small.svg" alt="arrow" />
            </a>
            <div className="resume-company-link">
              Skills: Branding, Visual Design, Motion Design
            </div>
            <ul className="resume-experience-list">
              <li className="resume-list-item">
                Provided a <span className="resume-highlight-text">branding service</span> for the
                company.
              </li>
              <li className="resume-list-item">
                Achieved <span className="resume-highlight-text">high fidelity designs</span> for the
                doctor's and patient's flow in a{' '}
                <span className="resume-highlight-text">very limited timeframe</span>
              </li>
              <li className="resume-list-item">
                <span className="resume-highlight-text">
                  Produced app's introductory video
                </span>{' '}
                for a entrepreneurial bootcamp.
              </li>
            </ul>
          </div>
        </div>

        <div className="resume-content-container">
          <div className="resume-title-content">Aug'20- Sep'21</div>
          <div className="resume-content">
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              UI/UX Designer
            </div>
            <a
              href="https://galleri5.com"
              className="resume-company-link"
              target="_blank"
              rel="noreferrer"
            >
              Galleri5 <img src="/assets/images/resume-arrow-small.svg" alt="arrow" />
            </a>
            <div className="resume-company-link">
              Skills: High Fidelity, Illustrations, Graphics, Emailers, Packaging design
            </div>
            <ul className="resume-experience-list">
              <li className="resume-list-item">
                Spearheaded the{' '}
                <span className="resume-highlight-text">
                  redesign of Brands' & Influencers' platform to increase respective user engagement &
                  bring consistency
                </span>
                . Both the platform together led to the smooth campaign management by taking care of
                activities like{' '}
                <span className="resume-highlight-text">
                  tracking influencer metrics, campaign budgeting, smooth payments, assigning/
                  approving deliverables
                </span>
                , etc.
              </li>
              <li className="resume-list-item">
                Worked on a <span className="resume-highlight-text">micro app for HRX (a client)</span>{' '}
                to track fitness goals for a campaign.
              </li>
              <li className="resume-list-item">
                Served with multitude of design horizons like{' '}
                <span className="resume-highlight-text">
                  social media posts, email marketing templates, presentation slides for business
                  pitch, packaging design for Myntra's EORS campaign, image & video editing for
                  influencer's deliverables
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="resume-heading">Education</div>
        <div className="resume-content-container">
          <div className="resume-title-content">2015 - 2019</div>
          <div className="resume-content">
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              Bachelor in Designing
            </div>
            <div className="resume-company-link">NIFT, Bangalore</div>
            <div className="resume-company-link">
              Textile Design | 8.5 GPA <br />
              Skills: Adobe Illustrator, Photoshop, Graphic Design
            </div>
          </div>
        </div>

        <div className="resume-heading">Contact</div>
        <div className="resume-content-container">
          <div className="resume-title-content">Email</div>
          <a
            className="resume-content"
            href="mailto:namy.designwork@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              namy.designwork@gmail.com{' '}
              <img src="/assets/images/resume-page-arrow.svg" style={{ marginLeft: '4px' }} alt="arrow" />
            </div>
          </a>
        </div>
        <div className="resume-content-container">
          <div className="resume-title-content">LinkedIn</div>
          <a
            className="resume-content"
            href="https://www.linkedin.com/in/namrata-jaiswal-213449197/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              linkedin.com/in/namrata-jaiswal{' '}
              <img src="/assets/images/resume-page-arrow.svg" style={{ marginLeft: '4px' }} alt="arrow" />
            </div>
          </a>
        </div>
        <div className="resume-content-container">
          <div className="resume-title-content">Behance</div>
          <a
            className="resume-content"
            href="https://www.behance.net/namrata_jaiswal"
            target="_blank"
            rel="noreferrer"
          >
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              behance.net/namrata_jaiswal{' '}
              <img src="/assets/images/resume-page-arrow.svg" style={{ marginLeft: '4px' }} alt="arrow" />
            </div>
          </a>
        </div>
        <div className="resume-content-container">
          <div className="resume-title-content">Dribbble</div>
          <a
            className="resume-content"
            href="https://dribbble.com/Namrata_Jaiswal"
            target="_blank"
            rel="noreferrer"
          >
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              dribbble.com/Namrata_Jaiswal{' '}
              <img src="/assets/images/resume-page-arrow.svg" style={{ marginLeft: '4px' }} alt="arrow" />
            </div>
          </a>
        </div>
        <div className="resume-content-container">
          <div className="resume-title-content">Website</div>
          <a
            className="resume-content"
            href="https://namy.design"
            target="_blank"
            rel="noreferrer"
          >
            <div className="resume-heading" style={{ marginBottom: '4px' }}>
              namy.design{' '}
              <img src="/assets/images/resume-page-arrow.svg" style={{ marginLeft: '4px' }} alt="arrow" />
            </div>
          </a>
        </div>
      </div>

      <div className="for-interesting-people"></div>
    </>
  );
}
