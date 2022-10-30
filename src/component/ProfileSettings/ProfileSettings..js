import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { useDropzone } from 'react-dropzone'

import Profileupload from '../../assets/profile-upload.png';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 18,

  overflow: 'hidden',
  width: 130,
  height: 130,
  padding: 0,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const ProfileSettings = (props) => {

  const { seteditSetting } = props;

  const [updated, setUpdated] = useState(false)
  const [disable, setDisable] = useState(false)
  const [value, setValue] = useState()
  const [avatarUrl, setavatarUrl] = useState('');

  const [phoneError, setphoneError] = useState('')
  // const [user] = useAuthState(auth);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });


  const { register, formState: { errors }, handleSubmit, reset, getValues, watch, setError } = useForm({ defaultValues: { month: '', date: '', year: '' } });

  if (files.length) {
    const formData = new FormData()
    formData.append('avatar', files[0]);
    try {
      axios.post('http://54.171.172.119:3001/api/v1/userProfiles/updateAvatar', formData)
        .then(response => {
          console.log(response)
          const { data } = response
          // reset()
          console.log(data)
          // setUpdated(true)
        })
    }
    catch (e) {
      console.log(e)
    }
  }

  const onSubmit = (data) => {
    if (value) {
      const { year, month, date, phone, address, city, province, postalCode, fullName } = data;
      const dateOfBirth = year + '-' + month + '-' + date;
      const countryCode = value?.toString().substring(0, 2);
      const phoneNumber = value?.toString().substring(3,);
      const submittedData = {
        dateOfBirth, countryCode, phoneNumber, address, city, province, postalCode, fullName,
      }

      if (avatarUrl) {
        submittedData.avatarUrl = avatarUrl;

      }
      // console.log(submittedData)
      // const formData = new FormData()
      // formData.append('phoneNumber', phoneNumber);
      // formData.append('countryCode', countryCode);
      // formData.append('province', submittedData.Province);
      // formData.append('address', submittedData.address);
      // formData.append('city', submittedData.city);
      // formData.append('fullName', submittedData.name);
      // formData.append('postalCode', submittedData.postal);
      // formData.append('avatarUrl', '');
      // formData.append('dateOfBirth', dateOfBirth);

      try {
        axios.post('http://54.171.172.119:3001/api/v1/userProfiles/createOrUpdate', submittedData)
          .then(response => {
            console.log(response)
            const { data } = response
            // reset()
            setUpdated(true)
          })
      }
      catch (e) {
        console.log(e)
      }

    }
    else {
      setphoneError('Phone number is required')

    }



  }


  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);


  return (
    <div className='main-form'>
      {updated ? <div className='profile-update-modal'>
        <div className='profile-update-content'>
          <p >Profile Updated <br />Successfully</p>
          <button onClick={() => [setUpdated(false), seteditSetting(false)]}>Done</button>
        </div>
      </div> : null}
      <div className="">
        <div className=''>
          <div class="">
            <div class="card-body">

              <form onSubmit={handleSubmit(onSubmit)}>

                <div {...getRootProps()} className='image-upload-wrapper'>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p><img src={Profileupload} alt='profile-upload' /></p>
                  </div>
                  {files.length ? <aside style={thumbsContainer}>
                    {thumbs}
                  </aside> : <div className='image-upload-avatar'> <img height={40} src='https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?k=20&m=587805156&s=612x612&w=0&h=Ok_jDFC5J1NgH20plEgbQZ46XheiAF8sVUKPvocne6Y=' />  </div>}
                </div>

                <div className="form-control w-full">

                  <input type="text" placeholder="Your Full Name"
                    className="input-content input input-bordered w-full "
                    {...register("fullName", {
                      required: {
                        value: true,
                        message: " Name is Required"
                      }
                    })}
                  />

                  {errors.fullName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.fullName.message}</span>}


                </div>

                <div className='input-content phone-input-wrapper'>
                  {/* <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}

                  /> */}
                  <PhoneInput
                    country={'us'}
                    value={value}
                    onChange={phone => setValue(phone)}
                  />
                </div>
                {phoneError && <span className="label-text-alt text-red-500">{phoneError}</span>}

                <div className="form-control w-full ">

                  <input type="text" placeholder="Your address"
                    className="input input-bordered w-full input-content"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is requires"
                      },

                    })}
                  />

                  {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address.message}</span>}

                </div>
                <div className="form-control w-full ">

                  <input type="text" placeholder="Your city"
                    className="input input-bordered w-full input-content"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "City is requires"
                      },

                    })}
                  />

                  {errors.city?.type === 'required' && <span className="label-text-alt text-red-500">{errors.city.message}</span>}

                </div>

                <div className='flex flex-row gap-3.5'>
                  <div className="form-control">

                    <input type="text" placeholder="Province"
                      className="input input-bordered w-full input-content"
                      {...register("province", {
                        required: {
                          value: true,
                          message: " Province is Required"
                        }
                      })}
                    />

                    {errors.province?.type === 'required' && <span className="label-text-alt text-red-500">{errors.province.message}</span>}


                  </div>

                  <div className="form-control">

                    <input type="text" placeholder="Postal Code"
                      className="input input-bordered w-full input-content"
                      {...register("postalCode", {
                        required: {
                          value: true,
                          message: " postal is Required"
                        }
                      })}
                    />

                    {errors.postalCode?.type === 'required' && <span className="label-text-alt text-red-500">{errors.postalCode.message}</span>}


                  </div>
                </div>

                <div>
                  <label className="label block">
                    <span className="label-text">Date of birth</span>
                  </label>
                  <div className='flex'>
                    <div>
                      <select {...register("month", { required: true })} className='select'>
                        <option value="" disabled>Month</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                      </select>

                      {errors.month?.type === 'required' && <span className="label-text-alt text-red-500"> select Month</span>}
                    </div>
                    <div>
                      <select {...register("date", { required: true })} className='select'>
                        <option value="" disabled>DD</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                      </select>
                      {errors.date?.type === 'required' && <span className="label-text-alt text-red-500"> select Date</span>}
                    </div>
                    <div>
                      <select {...register("year", { required: true })} className='select'>
                        <option value='' disabled>YYYY</option>
                        <option value='2019'>2019</option>
                        <option value='2018'>2018</option>
                        <option value='2017'>2017</option>
                        <option value='2016'>2016</option>
                        <option value='2015'>2015</option>
                        <option value='2014'>2014</option>
                        <option value='2013'>2013</option>
                        <option value='2012'>2012</option>
                        <option value='2011'>2011</option>
                        <option value='2010'>2010</option>
                        <option value='2009'>2009</option>
                        <option value='2008'>2008</option>
                        <option value='2007'>2007</option>
                        <option value='2006'>2006</option>
                        <option value='2005'>2005</option>
                        <option value='2004'>2004</option>
                        <option value='2003'>2003</option>
                        <option value='2002'>2002</option>
                        <option value='2001'>2001</option>
                        <option value='2000'>2000</option>
                        <option value='1999'>1999</option>
                        <option value='1998'>1998</option>
                        <option value='1997'>1997</option>
                        <option value='1996'>1996</option>
                        <option value='1995'>1995</option>
                        <option value='1994'>1994</option>
                        <option value='1993'>1993</option>
                        <option value='1992'>1992</option>
                        <option value='1991'>1991</option>
                        <option value='1990'>1990</option>
                        <option value='1989'>1989</option>
                        <option value='1988'>1988</option>
                        <option value='1987'>1987</option>
                        <option value='1986'>1986</option>
                        <option value='1985'>1985</option>
                        <option value='1984'>1984</option>
                        <option value='1983'>1983</option>
                        <option value='1982'>1982</option>
                        <option value='1981'>1981</option>
                        <option value='1980'>1980</option>
                        <option value='1979'>1979</option>
                        <option value='1978'>1978</option>
                        <option value='1977'>1977</option>
                        <option value='1976'>1976</option>
                        <option value='1975'>1975</option>
                        <option value='1974'>1974</option>
                        <option value='1973'>1973</option>
                        <option value='1972'>1972</option>
                        <option value='1971'>1971</option>
                        <option value='1970'>1970</option>
                        <option value='1969'>1969</option>
                        <option value='1968'>1968</option>
                        <option value='1967'>1967</option>
                        <option value='1966'>1966</option>
                        <option value='1965'>1965</option>
                        <option value='1964'>1964</option>
                        <option value='1963'>1963</option>
                        <option value='1962'>1962</option>
                        <option value='1961'>1961</option>
                        <option value='1960'>1960</option>
                        <option value='1959'>1959</option>
                        <option value='1958'>1958</option>
                        <option value='1957'>1957</option>
                        <option value='1956'>1956</option>
                        <option value='1955'>1955</option>
                        <option value='1954'>1954</option>
                        <option value='1953'>1953</option>
                        <option value='1952'>1952</option>
                        <option value='1951'>1951</option>
                        <option value='1950'>1950</option>
                        <option value='1949'>1949</option>
                        <option value='1948'>1948</option>
                        <option value='1947'>1947</option>
                        <option value='1946'>1946</option>
                        <option value='1945'>1945</option>
                        <option value='1944'>1944</option>
                        <option value='1943'>1943</option>
                        <option value='1942'>1942</option>
                        <option value='1941'>1941</option>
                        <option value='1940'>1940</option>
                        <option value='1939'>1939</option>
                        <option value='1938'>1938</option>
                        <option value='1937'>1937</option>
                        <option value='1936'>1936</option>
                        <option value='1935'>1935</option>
                        <option value='1934'>1934</option>
                        <option value='1933'>1933</option>
                        <option value='1932'>1932</option>
                        <option value='1931'>1931</option>
                        <option value='1930'>1930</option>
                        <option value='1929'>1929</option>
                        <option value='1928'>1928</option>
                        <option value='1927'>1927</option>
                        <option value='1926'>1926</option>
                        <option value='1925'>1925</option>
                        <option value='1924'>1924</option>
                        <option value='1923'>1923</option>
                        <option value='1922'>1922</option>
                        <option value='1921'>1921</option>
                        <option value='1920'>1920</option>
                        <option value='1919'>1919</option>
                        <option value='1918'>1918</option>
                        <option value='1917'>1917</option>
                        <option value='1916'>1916</option>
                        <option value='1915'>1915</option>
                        <option value='1914'>1914</option>
                        <option value='1913'>1913</option>
                        <option value='1912'>1912</option>
                        <option value='1911'>1911</option>
                        <option value='1910'>1910</option>
                        <option value='1909'>1909</option>
                        <option value='1908'>1908</option>
                        <option value='1907'>1907</option>
                        <option value='1906'>1906</option>
                        <option value='1905'>1905</option>
                        <option value='1904'>1904</option>
                        <option value='1903'>1903</option>
                        <option value='1902'>1902</option>
                        <option value='1901'>1901</option>
                        <option value='1900'>1900</option>
                      </select>
                      {errors.year?.type === 'required' && <span className="label-text-alt text-red-500"> select Year</span>}
                    </div>
                  </div>



                </div>


                <div className="form-buttons-wrapper flex">
                  <button
                    disabled={disable ? `true` : false}
                    className='btn save-change-btn'
                    type="submit"
                    value="Place Order"
                  >
                    Save Changes
                  </button>
                  <button className='btn cancel-btn' onClick={() => seteditSetting(false)}>Cancel</button>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;