import { useState } from "react";
import BMHeader from "./BMHeader";
import BMBody from "./BMBody";

const ManagerBM = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <BMHeader
        onStatusChange={setStatusFilter}
        onTopicChange={setTopicFilter}
        searchKeyword={searchKeyword}
        setSearchKeyword={handleSearchChange}
      />
      <BMBody
        searchKeyword={searchKeyword}
        statusFilter={statusFilter}
        topicFilter={topicFilter}
      />
    </div>
  );
};

export default ManagerBM;
