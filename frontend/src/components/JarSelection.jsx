import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";

const JarSelection = () => {
  const [causes, setCauses] = useState([
    { id: "cr", name: "Community & Relationships", selected: false },
    {
      id: "ea",
      name: "Environmental Sustainability & Animal Welfare",
      selected: false,
    },
    { id: "hh", name: "Holistic Health", selected: false },
    { id: "pde", name: "Personal Development & Education", selected: false },
  ]);

  const [selectedCount, setSelectedCount] = useState(0);
  const [organizations, setOrganizations] = useState({});
  const [selectedOrgs, setSelectedOrgs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // fetch organizations when a cause is selected
  useEffect(() => {
    const fetchOrganizations = async (causeType) => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5013/api/organizations/by-cause?causeType=${causeType}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch organizations");
        }

        const data = await response.json();
        console.log("Fetched organizations for causeType:", causeType, data); // de🪲 log

        setOrganizations((prev) => ({
          ...prev,
          [causeType]: data,
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Failed to load organizations. Please try again.");
        setLoading(false);
      }
    };

    // fetch organizations for each selected cause
    causes.forEach((cause) => {
      if (cause.selected && !organizations[cause.id]) {
        fetchOrganizations(cause.id);
      }
    });
  }, [causes]);

  const handleCauseSelection = (id) => {
    const updatedCauses = causes.map((cause) => {
      if (cause.id === id) {
        // If we're trying to select more than 3, prevent it
        if (!cause.selected && selectedCount >= 3) {
          setError("You can only select up to 3 causes");
          return cause;
        }
        setError("");
        return { ...cause, selected: !cause.selected };
      }
      return cause;
    });

    setCauses(updatedCauses);
    setSelectedCount(updatedCauses.filter((c) => c.selected).length);
  };

  const handleOrgSelection = (causeId, orgId) => {
    setSelectedOrgs((prev) => ({
      ...prev,
      [causeId]: orgId,
    }));
  };

  const handleSaveJars = async () => {
    try {
      setLoading(true);

      // create an array of selected jars
      const jars = causes
        .filter((cause) => cause.selected)
        .map((cause) => ({
          causeType: cause.id, // use the abbreviation (e.g., 'cr', 'hh')
          organizationId: selectedOrgs[cause.id],
        }));

// this route is not working yet

      // send the jars to the backend
      const response = await fetch("http://localhost:5013/api/users/jars", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jars }),
      });

      if (!response.ok) {
        throw new Error("Failed to save jars");
      }

      setSuccess("Your jars have been saved successfully!");
      setLoading(false);
    } catch (err) {
      console.error("Error saving jars:", err);
      setError("Failed to save your selections. Please try again.");
      setLoading(false);
    }
  };

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

            {loading && (
              <div className="text-center my-3">Loading organizations...</div>
            )}

            {causes
              .filter((cause) => cause.selected)
              .map((cause) => (
                <div key={cause.id} className="mb-4">
                  <h5>{cause.name}</h5>

                  {organizations[cause.id] ? (
                    <Form.Select
                      onChange={(e) =>
                        handleOrgSelection(cause.id, e.target.value)
                      }
                      value={selectedOrgs[cause.id] || ""}
                    >
                      <option value="">Select an organization</option>
                      {organizations[cause.id].map((org) => (
                        <option key={org._id} value={org._id}>
                          {org.orgName}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <div>Loading organizations...</div>
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
            causes.filter((c) => c.selected).some((c) => !selectedOrgs[c.id])
          }
        >
          {loading ? "Saving..." : "Save My Jars"}
        </Button>
      </div>
    </Container>
  );
};

export default JarSelection;
