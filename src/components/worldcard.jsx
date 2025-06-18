import { useEffect, useState } from 'react';

const Worldcard = () => {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch(
            'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,area,region,languages,currencies,subregion,translations'
        )
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedData);
            });
    }, []);
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-6">World Information</h1>

            <div className="mb-6 text-center flex">
                <h1 className='text-2xl font-bold mx-3'>Search:</h1>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:w-1/2 shadow"
                />
            </div>

            {filteredCountries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCountries.map((country, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg shadow-md p-4 bg-white"
                        >
                            <h2 className="text-lg font-semibold mb-2">
                                {index}) {country.name.common}
                            </h2>
                            <img
                                src={country.flags?.png}
                                alt={`${country.name.common} flag`}
                                className="w-full h-32 object-contain mb-2"
                            />
                            <ul className="text-sm space-y-1">
                                <li>
                                    <strong>Capital:</strong>{' '}
                                    {country.capital ? country.capital[0] : 'N/A'}
                                </li>
                                <li>
                                    <strong>Population:</strong>{' '}
                                    {country.population?.toLocaleString()}
                                </li>
                                <li>
                                    <strong>Area:</strong>{' '}
                                    {country.area?.toLocaleString()} km²
                                </li>
                                <li>
                                    <strong>Region:</strong> {country.region}
                                </li>
                                <li>
                                    <strong>Subregion:</strong> {country.subregion || 'N/A'}
                                </li>
                                <li>
                                    <strong>Languages:</strong>{' '}
                                    {country.languages
                                        ? Object.values(country.languages).join(', ')
                                        : 'N/A'}
                                </li>
                                <li>
                                    <strong>Currencies:</strong>{' '}
                                    {country.currencies
                                        ? Object.values(country.currencies)
                                            .map(curr => `${curr.name} (${curr.symbol || ''})`)
                                            .join(', ')
                                        : 'N/A'}
                                </li>
                                <li>
                                    <strong>Translations:</strong>{' '}
                                    {country.translations
                                        ? Object.values(country.translations)
                                            .map(t => t.common)
                                            .join(', ')
                                        : 'N/A'}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No countries found.</p>
            )}
        </div>
    );
};

export default Worldcard;
