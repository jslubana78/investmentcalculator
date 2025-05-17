import React, { useEffect, useState } from 'react'
import { calculateInvestmentResults, formatter } from '../util/investment'

function UserInput() {
  const [data, setData] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })
  const [results, setResults] = useState([])
  useEffect(() => {
    let resultsD = calculateInvestmentResults({ ...data })
    setResults(resultsD)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    let newDataObj = { ...data, [name]: parseInt(value) }

    setData(newDataObj)
    //     console.log({ data, newDataObj })
    let resultsD = calculateInvestmentResults({ ...newDataObj })
    setResults(resultsD)
    //     console.log(results)
  }

  let totalInterest
  return (
    <>
      <div id='user-input'>
        <div className='input-group'>
          <div>
            <label>Initial Investment</label>
            <input
              type='number'
              value={data.initialInvestment}
              onChange={() => handleInputChange}
              name='initialInvestment'
            />
          </div>
          <div>
            <label>Annual Investment</label>
            <input
              type='number'
              value={data.annualInvestment}
              onChange={(event) => handleInputChange(event)}
              name='annualInvestment'
            />
          </div>
        </div>
        <div className='input-group'>
          <div>
            <label>Expected Return</label>
            <input
              type='number'
              value={data.expectedReturn}
              onChange={(event) => handleInputChange(event)}
              name='expectedReturn'
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              type='number'
              value={data.duration}
              onChange={(event) => handleInputChange(event)}
              name='duration'
            />
          </div>
        </div>
      </div>
      <div id=''>
        {results.length > 0 && (
          <table id='result'>
            <thead>
              <tr>
                <td>Year</td>
                <td>Investment Value</td>
                <td>Interest (Year)</td>
                <td>Total Interest</td>
                <td>Investment Capital</td>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => {
                //  console.log(row)
                const cumulativeInterest = results
                  .slice(0, index + 1)
                  .reduce((sum, r) => sum + r.interest, 0)

                const investedCapital =
                  data.initialInvestment + data.annualInvestment * row.year
                return (
                  <tr key={index}>
                    <td>{row.year}</td>
                    <td>{formatter.format(row.valueEndOfYear)}</td>
                    <td>{formatter.format(row.interest)}</td>
                    <td>{formatter.format(cumulativeInterest)}</td>
                    <td>{formatter.format(investedCapital)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default UserInput
