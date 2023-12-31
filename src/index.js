import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import arrowIcon from './images/icon-arrow.svg';

const Card = () => {
    const [year, setYear] = React.useState('- -');
    const [month, setMonth] = React.useState('- -');
    const [day, setDay] = React.useState('- -');

    const [dayError, setDayError] = React.useState('');
    const [monthError, setMonthError] = React.useState('');
    const [yearError, setYearError] = React.useState('');

    const [inputClass, setInputClass] = React.useState('');
    const [labelClass, setLabelClass] = React.useState('');

    // input validation
    const validateDate = (inputDay, inputMonth, inputYear) => {
        let valid = true;

        if (isNaN(inputDay)) {
            valid = false;
            setDayError('This field is required');
        }
        if (isNaN(inputMonth)) {
            valid = false;
            setMonthError('This field is required');
        }
        if (isNaN(inputYear)) {
            valid = false;
            setYearError('This field is required');
        }

        if (!valid) return valid;

        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // deal with feb
        if (inputMonth === 2) {
            let leap = false;
            if ((!(inputYear % 4) && inputYear % 100) || !(inputYear % 400)) {
                leap = true;
            } 
            if ((!leap && inputDay >= 29) || (leap && inputDay > 29)) {
                setMonthError('Must be a valid date');
                valid = false;
            }
        }

        // invalid month
        else if (inputMonth < 1 || inputMonth > 12) {
            setMonthError('Must be a valid month');
            if (0 <= inputDay || inputDay > 31) setDayError('Must be a valid date')
            valid = false;
        }

        // check valid day for valid month
        else {
            if (days[inputMonth - 1] < inputDay) {
                setDayError('Must be a valid date');
                valid = false;
            }
        }

        // check year
        if (inputYear < 0) {
            setYearError('Year cannot be negative');
            valid = false;
        }
        else if (inputYear > new Date().getFullYear()) {
            setYearError('Must be in the past');
            valid = false;
        }
        else if (new Date(`${inputYear}-${inputMonth}-${inputDay}`) > new Date()) {
            setDayError('Must be in the past');
            setMonthError('Must be in the past');
            setYearError('Must be in the past');
            valid = false;
        }
        return valid
    }

    const displayAge = (inputDay, inputMonth, inputYear) => {
        // let birthday = new Date(`${inputYear}-${inputMonth}-${inputDay}`)
        // let diff = Date.now() - birthday.getTime();
        // let ageDate = new Date(diff); // in millis
        // let [displayYear, displayMonth, displayDay] = [Math.abs(ageDate.getUTCFullYear() - 1970), ageDate.getMonth(), ageDate.getDate()];
        // setYear(displayYear);
        // setMonth(displayMonth);
        // setDay(displayDay);

        let diff = new Date() - new Date(`${inputYear}-${inputMonth}-${inputDay}`);
        const age = new Date(diff)
        let [displayYear, displayMonth, displayDay] = [age.getFullYear() - 1970, age.getMonth(), age.getDate()];
        setYear(displayYear);
        setMonth(displayMonth);
        setDay(displayDay);

        //calculate the date of birth
        // const dateOfBirth = new Date(`${year}-${month}-${day}`)
        // //calculate the current date
        // const currentDate = new Date()
        // //calculate the difference between the current date and the date of birth
        // const difference = currentDate - dateOfBirth
        // //calculate the age - years, months, days
        // const age = new Date(difference)
        // //calculate the age - years
        // const ageYears = age.getFullYear() - 1970
        // ageYears == 0 ? setYear('0') : setYear(ageYears)
        // //calculate the age - months
        // const ageMonths = age.getMonth()
        // setMonth(ageMonths)
        // ageMonths == 0 ? setMonth('0') : setMonth(ageMonths)
        // //calculate the age - days
        // const ageDays = age.getDate() - 1
        // setDay(ageDays)
        // ageDays == 0 ? setDay('0') : setDay(ageDays)
    }

    const handleFormInput = (e) => {
        e.preventDefault()
        const inputDay = document.querySelector('#day').value;
        const inputMonth = document.querySelector('#month').value;
        const inputYear = document.querySelector('#year').value;

        // clear past errors (todo: clear red class as well)
        setDayError('')
        setMonthError('')
        setYearError('')
        setInputClass('')
        setLabelClass('')
        setDay('- -');
        setMonth('- -');
        setYear('- -');

        // validate date
        let valid = validateDate(parseInt(inputDay), parseInt(inputMonth), parseInt(inputYear));
        if (valid) {
            // display results
            displayAge(inputDay, inputMonth, inputYear);
        }
        else {
            setInputClass('red');
            setLabelClass('red-text')
        }

        
    };
    return (
        <section className="container">
            <div className="card">
                <form>
                    <div className='input-holder'>
                        <div className="input">
                            <label htmlFor="day" className={labelClass}>day</label>
                            <input type="text" name='day' className={inputClass} id='day' placeholder='dd' />
                            <span>{dayError}</span>
                        </div>
                        <div className="input">
                            <label htmlFor="month" className={labelClass}>month</label>
                            <input type="text" name='month' className={inputClass} id='month' placeholder='mm' />
                            <span>{monthError}</span>
                        </div>
                        <div className="input">
                            <label htmlFor="year" className={labelClass}>year</label>  
                            <input type="text" name='year' className={inputClass} id='year' placeholder='yyyy' />
                            <span>{yearError}</span>
                        </div>
                    </div>

                    <div className="submit-area">
                        <div className="hr">
                            <hr />
                        </div>
                        <button type="submit" value='' id='submit' onClick={handleFormInput}>
                            <img src={arrowIcon} alt="" />
                        </button>
                    </div>
                </form>
                <div className="output">
                    <h1><span>{year}</span> years</h1>
                    <h1><span>{month}</span> months</h1>
                    <h1><span>{day}</span> days</h1>
                </div>
            </div>
        </section>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Card />
);
