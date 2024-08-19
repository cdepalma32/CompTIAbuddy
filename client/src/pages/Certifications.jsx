import CertificationList from "../components/CertificationList";

const Certifications = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Certifications</h1>
      <div className="certification-list-container">
        <CertificationList />
      </div>
    </div>
  );
};

export default Certifications;
