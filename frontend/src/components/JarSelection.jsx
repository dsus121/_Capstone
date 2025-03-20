import MyDropdown from '../components/MyDropdown'
import { useJarSelection } from "./hooks/useJarSelection.js"

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";

const JarSelection = () => {
  const {
    causes,
    organizations,
    selectedOrgs,
    loading,
    error,
    success,
    areAllOrganizationsSelected,
    selectedCount,
    handleCauseSelection,
    handleOrgSelection,
    handleSaveJars
  } = useJarSelection();

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Select Your Cause Jars</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Step 1: Choose up to 3 causes</Card.Title>
          <Card.Text>
            Select up to three causes that matter most to you. These will become
            your "jars" where you can contribute cookies.
          </Card.Text>

          <Row className="mb-3">
            {causes.map((cause) => (
              <Col key={cause.id} xs={6} md={4} className="mb-3">
                <Card
                  onClick={() => handleCauseSelection(cause.id)}
                  className={`h-100 ${cause.selected ? "border-primary" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="text-center">
                    <Card.Title>{cause.name}</Card.Title>
                    {cause.selected && (
                      <div className="text-primary">
                        <i className="bi bi-check-circle-fill"></i> Selected
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {causes.some((cause) => cause.selected) && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Step 2: Select organizations for each cause</Card.Title>
            <Card.Text>
              Choose one organization for each of your selected causes.
            </Card.Text>

            {causes
              .filter((cause) => cause.selected)
              .map((cause) => (
                <div key={cause.id} className="mb-4">
                  <h5>{cause.name}</h5>

                  {organizations[cause.id] ? (
                    <div className="form-container">
                      <MyDropdown
                        options={organizations[cause.id]?.map(org => ({ // optional chaining
                          value: org._id,
                          label: org.orgName
                        }))}
                        value={selectedOrgs[cause.id] || ""}
                        onChange={(value) => handleOrgSelection(cause.id, value)}
                        placeholder="Select an organization"
                      />
                    </div>
                  ) : (
                    <div className="p-2 border rounded">Loading organizations...</div>
                  )}
                </div>
              ))}
          </Card.Body>
        </Card>
      )}

      <div className="text-center">
        <Button
          variant="primary"
          onClick={handleSaveJars}
          disabled={
            loading ||
            selectedCount === 0 ||
            !areAllOrganizationsSelected
          }
        >
          {loading ? "Saving..." : "Save My Jars"}
        </Button>
      </div>
    </Container>
  );
};

export default JarSelection;