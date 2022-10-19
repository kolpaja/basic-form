import React from 'react';
import surveyImg from '../assets/Survey.svg';

function Result({ isSubmitted, data, handleClose }) {
  console.log({ data });
  if (!isSubmitted)
    return (
      <>
        <img src={surveyImg} width={300} height={300} alt='survey form img' />
      </>
    );
  return (
    <section>
      <h2 className='text-success'>
        Form Submited successfully{' '}
        <span class='glyphicon glyphicon-ok' aria-hidden='true'></span>
      </h2>
      <h3>
        {data.firstName} {data.lastName}
      </h3>
      <h3>{data.email}</h3>
      <h3>Hobbies</h3>
      {data.hobbies.length > 0 ? (
        <ul className='list-group w-50'>
          {data.hobbies.map((hoby) => (
            <li key={hoby.value} class='w-50 list-group-item'>
              {hoby.label}
            </li>
          ))}
        </ul>
      ) : (
        'no hobbies'
      )}
      <button type='button' onClick={handleClose} className='btn btn-success'>
        OK
      </button>
    </section>
  );
}

export default Result;
