import MyDropdown from './MyDropdown';

const OrganizationCard = ({ cause, organizations, selectedOrgs, onSelect }) => {
  return (
    <div key={cause.id} className="mb-4">
      <h5>{cause.name}</h5>

      {organizations[cause.id] ? (
        <div className="form-container">
          <MyDropdown
            options={organizations[cause.id].map(org => ({
              value: org._id,
              label: org.orgName
            }))}
            value={selectedOrgs[cause.id] || ""}
            onChange={(value) => onSelect(cause.id, value)}
            placeholder="Select an organization"
          />
        </div>
      ) : (
        <div className="p-2 border rounded">Loading organizations...</div>
      )}
    </div>
  );
};

export default OrgCard;