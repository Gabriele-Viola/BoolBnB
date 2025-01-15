import { useState, useEffect } from "react"
import PropertyCard from '../components/PropertyCard'

export default function AddPropertiesPage() {
	const initialFormData = {
		name : '',
		rooms : 0,
		beds : 0,
		bathrooms : 0,
		mq : 0,
		address :'',
		email_owners : '',
		image : null
	}
	const [formData, setFormData] = useState(initialFormData);
	const [selectedFile, setSelectedFile] = useState(null);
	const [properties, setProperties] = useState([]);
	const [filteredProperties, setFilteredProperties] = useState(properties);

	function fetchData(url = 'hhttp://localhost:3001/something'){
		fetch(url)
			.then(res=>res.json)
			.then(response=>{setProperties(response.data)})
			.catch(error=>{console.log('Error fetching data: ',err)})
	}
	useEffect(()=>{
		fetchData();
	},[]);
	useEffect(()=>{
		setFilteredProperties(properties);
	},[properties])
	
	return (
		<div className="container py-3">
		  <form className="my-3 rounded p-4" >  {/*onSubmit={}*/}
			<div className="form-group col-md-6 ">

			  <div className="form-group mb-3">
				<label htmlFor="name">Name Property</label>
				<input className="form-control" type="text" id="name" name="name" placeholder="Name property" value={FormData.name} onChange={handleFormField}/>
			  </div>

			  <div className='row mb-3'>
                <div className='form-group col-md-6 '>
                  <label htmlFor="formFile" className='form-label'>Add photo: </label><br />
                  <label className="btn" htmlFor="formFile">Choose File</label> 
                  <input className="form-control d-none" type="file" id="image" name="image" accept="image/*" onChange={handleFormField}/>  {/* accept="image/*" ACCEPT ONLY IMG! */}
                  {selectedFile && <img src={selectedFile} alt='cover image' className='img-fluid rounded'/>}
                </div>
			  </div>

			  <div>
				<label htmlFor="rooms">Rooms</label>
				<input type="number" id="rooms" name="rooms" min="0" max="100" value={FormData.rooms} onChange={handleFormField} />
			  </div>
			  <div>
				<label htmlFor="beds">Beds</label>
				<input type="number" id="beds" name="beds" min="0" max="100" value={FormData.beds} onChange={handleFormField} />
			  </div>
			  <div>
				<label htmlFor="bathrooms">Bathrooms</label>
				<input type="number" id="bathrooms" name="bathrooms" min="0" max="100" value={FormData.bathrooms} onChange={handleFormField} />
			  </div>
			  <div>
				<label htmlFor="mq">Mq</label>
				<input type="number" id="mq" name="mq" min="0" max="10000" value={FormData.mq} onChange={handleFormField} />
			  </div>

			  <div className='form-group mb-3'>
                <label className="" htmlFor="address">Address</label>
                <input className='form-control' type="text" id="address" name="address" placeholder="Address"  value={formData.address} onChange={handleFormField}/> {/* required value= */}
              </div>
			  <div className='form-group mb-3'>
                <label className="" htmlFor="email_owners">Email owners</label>
                <input className='form-control' type="text" id="email_owners" name="email_owners" placeholder="Email owners"  value={formData.address} onChange={handleFormField}/> {/* required value= */}
              </div>

			  <div className='form-group col-md-8 mt-4 mx-auto'>
                <button className='btn btn-DarkRose w-100' type='submit' id='formSubmit' name='submit'>
                  <span className='d-flex align-items-center justify-content-center gap-2'>
                    <span>SAVE</span> 
                    <i className="bi bi-cloud-arrow-up"/>
                  </span>
                </button>
                <button type="button" onClick={showMangas}>show mangas</button>  {/*x debug see all filteredMangs*/}
              </div>
			  
			</div>
		  </form>

		  <section className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-3 mb-3">

		  </section>
		</div>
	)
}
