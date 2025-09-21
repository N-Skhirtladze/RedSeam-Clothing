import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Filtration from './components/filtration'
import DisplayCriteria from './components/display-filter-criteria';
import DisplayCards from './components/products';
import createURL from './components/URL';
import Pages from './components/pages';


function App() {
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('form-data')) || null);
  const [criteria, setCriteria] = useState(JSON.parse(localStorage.getItem('filter-criteria')) || null);
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [apiData, setApiData] = useState({});
  const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem('page')) || 1);



  useEffect(() => {
    let URL = createURL(formData, criteria, currentPage);
    const fetchData = async () => {
      const api = await fetch(URL);
      try {
        if (api.ok) {
          const data = await api.json();
          setProducts(data.data);
          setApiData(data);
          // console.log(apiData);
          // console.log(`full data`, data);
          localStorage.setItem('form-data', JSON.stringify(formData));
          localStorage.setItem('page', JSON.stringify(currentPage));
          localStorage.setItem('filter-criteria', JSON.stringify(criteria))
        }

      } catch (error) {
        console.log(error);
      }

    }
    fetchData();
  }, [formData, criteria, currentPage])

  useEffect(() => {
    setCurrentPage(1);
    // localStorage.setItem('page', JSON.stringify(1));
  }, [formData, criteria]);

  return (
    <>
      <Header />
      <Filtration setCriteria={setCriteria} firstInputProps={register("from")} secondInputProps={register("to")} handleSubmit={handleSubmit} setFormData={setFormData} />
      {formData ? <DisplayCriteria price={formData} setFormData={setFormData} /> : null}
      <DisplayCards products={products} />
      <Pages pageAmount={apiData.meta?.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default App
