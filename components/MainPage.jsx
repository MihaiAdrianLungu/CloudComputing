import { useEffect, useState } from "react";

const MainPage = () => {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await fetch("/api/records", {
        method: "GET",
      });

      const data = await response.json();

      if (!data?.data) {
        return;
      }

      setRecords(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (event) => {
    event.preventDefault();

    try {
      const id = event.target.id;

      const requestOptions = {
        method: "DELETE",
      };
  
      const response = await fetch(`/api/records?id=${id}`, requestOptions);
      const json = await response.json();

      if (json?.data?.deletedCount === 1) {
        setRecords(records.filter((record) => record._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecordHandler = (id) => {
    window.location.href = `/update/${id}`;
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {records.map((record) => (
        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          key={record._id}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {record.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {record.description}
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => updateRecordHandler(record._id)}
            >
              Update
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={deleteRecord}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
