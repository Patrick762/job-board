import { locations } from "@/constants/locations";

const LocationFilter = ({ setCurrentLocation, currentLocation }) => {
  const handleChange = async (e) => {
    setCurrentLocation(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
      <div className="w-70">
        <select
          id="countries"
          value={currentLocation}
          onChange={handleChange}
          className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full p-2"
        >
          <option value="">Choose a location</option>
          {locations.map(({ stateCode, city }) => (
            <option key={stateCode} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationFilter;
