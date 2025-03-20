import { useState, useEffect } from "react";

// custom hook to handle jar selection logic
export const useJarSelection = () => {
  // state for available causes and their selection status
  const [causes, setCauses] = useState([
    { id: "cr", name: "community & relationships", selected: false },
    { id: "ea", name: "environmental sustainability & animal welfare", selected: false },
    { id: "hh", name: "holistic health", selected: false },
    { id: "pde", name: "personal development & education", selected: false },
  ]);

  // state for storing organizations and selected organizations
  const [organizations, setOrganizations] = useState({});
  const [selectedOrgs, setSelectedOrgs] = useState({});
  const [loading, setLoading] = useState(false); // loading state for async operations
  const [error, setError] = useState(""); // error state for handling API errors
  const [success, setSuccess] = useState(""); // success state for successful operations

  // derived state: counts how many causes are selected
  const selectedCount = causes.filter((cause) => cause.selected).length;
  
  // derived state: checks if all selected causes have organizations selected
  const areAllOrganizationsSelected = causes
    .filter((cause) => cause.selected)
    .every((cause) => selectedOrgs[cause.id]);

  // fetch organizations based on the selected cause type
  const fetchOrganizations = async (causeType) => {
    try {
      setLoading(true); // set loading to true before starting the fetch
      const response = await fetch(
        `http://localhost:5013/api/organizations/by-cause?causeType=${causeType}`
      );

      if (!response.ok) {
        throw new Error(`failed to fetch organizations (status: ${response.status})`);
      }

      const data = await response.json();
      setOrganizations((prev) => ({
        ...prev,
        [causeType]: data, // update the organizations state with new data
      }));
    } catch (err) {
      setError(`failed to load organizations: ${err.message}`); // handle fetch error
    } finally {
      setLoading(false); // set loading to false once the fetch is done
    }
  };

  // handle selection of a cause
  const handleCauseSelection = (id) => {
    setCauses((prevCauses) =>
      prevCauses.map((cause) =>
        cause.id === id
          ? {
              ...cause,
              selected: !cause.selected && selectedCount < 3, // limit to 3 selected causes
            }
          : cause
      )
    );

    // if organizations for the cause haven't been fetched yet, fetch them
    if (!organizations[id]) {
      fetchOrganizations(id);
    }
  };

  // handle selection of an organization for a cause
  const handleOrgSelection = (causeId, orgId) => {
    setSelectedOrgs((prev) => ({
      ...prev,
      [causeId]: orgId, // update selected organizations state
    }));
  };

  // save the jars (selected causes and organizations) to the server
  const handleSaveJars = async () => {
    console.log("Save My Jars button clicked"); // Debug log

    try {
      setLoading(true); // set loading state to true before saving
      setError(""); // clear any previous errors
      setSuccess(""); // clear previous success messages

      const user = JSON.parse(localStorage.getItem("user")); // Parse the stored JSON string
      const email = user?.email; // Extract the email from the user object
      console.log("Retrieved email:", email); // Debug log
  
      if (!email) {
        setError("User email not found. Please log in again."); // Handle missing email
        setLoading(false);
        return;
      }

      const jars = causes
        .filter((cause) => cause.selected) // filter selected causes
        .map((cause) => ({
          causeType: cause.id, // map cause id to causeType
          organizationId: selectedOrgs[cause.id], // map organization id to organizationId
          organizationName: organizations[cause.id]?.find(
            (org) => org._id === selectedOrgs[cause.id]
          )?.orgName, // find the organization name based on the selected organization ID
        }));

      console.log("Saving jars:", jars);
      console.log("Detailed jars data being sent:", JSON.stringify(jars, null, 2));

    // Validate the jars array before sending it to the backend
    const invalidJars = jars.filter(
      (jar) =>
        !jar.causeType ||
        !['cr', 'ea', 'hh', 'pde'].includes(jar.causeType) ||
        !jar.organizationId ||
        !jar.organizationName
    );

    if (invalidJars.length > 0) {
      setError("Some jars have invalid data. Please review your selections.");
      setLoading(false);
      return;
    }
    
      // send the selected jars to the backend API
      const response = await fetch(`http://localhost:5013/api/users/${email}/jars`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // set the content type to JSON
        },
        body: JSON.stringify({ jars }), // send the jars as the request body
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("failed to save jars");
      }

      setSuccess("Your jars have been saved successfully!"); // success message
    } catch (err) {
      setError(`Failed to save your selections: ${err.message}`); // handle error
    } finally {
      setLoading(false); // set loading state to false after saving
    }
  };

  // return the state and functions to be used by the component
  return {
    causes, // list of causes
    organizations, // list of organizations
    selectedOrgs, // selected organizations
    loading, // loading state
    error, // error state
    success, // success state
    areAllOrganizationsSelected, // check if all selected causes have organizations
    selectedCount, // count of selected causes
    handleCauseSelection, // function to handle cause selection
    handleOrgSelection, // function to handle organization selection
    handleSaveJars, // function to save jars
    clearError: () => setError(""), // clear the error message
    clearSuccess: () => setSuccess(""), // clear the success message
  };
};
