import React, { useState } from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import {
  Button,
  MenuItem,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from "react-material-ui-form-validator"
import AccountCircle from "@material-ui/icons/AccountCircle"
import _ from "lodash"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 220,
    },
    width: "50%",
    alignItems: "center",
    justify: "center",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  error: {
    color: "red",
    fontSize: "small",
  },
}))

const genders = [
  {
    value: "M",
    label: "Male",
  },
  {
    value: "F",
    label: "Female",
  },
  {
    value: "O",
    label: "Other",
  },
]

const initialState = {
  email: "",
  age: "",
  gender: "",
  gender2: "",
  checkboxes: {
    checkboxA: true,
    checkboxB: false,
  },
}

function reducer(state, newState) {
  return _.merge({}, state, newState)
}

const Result = props => (
  <div>
    Your email {props.state.email}, age: {props.state.age} gender:{" "}
    {props.state.gender} gender2: {props.state.gender2}, is submitted.
  </div>
)

export default function MyForm(props) {
  const classes = useStyles()
  const [isSubmitted, setSubmitted] = useState(false)
  // const [email, setEmail] = useState("")
  // const [age, setAge] = useState("")
  // const [gender, setGender] = useState("")
  // const [gender2, setGender2] = useState("")
  // const [checkboxes, setCheckboxes] = useState({
    //   checkboxA: true,
    //   checkboxB: false,
    // })
  const [error] = useState("Test")
    
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // const handleChange = e => {
  //   const name = e.target.name
  //   const value = e.target.value

  //   if (name === "gender") setGender(value)
  //   else if (name === "gender2") setGender2(value)
  // }

  // const handleEmailChange = ({ target: { value, name, type } }) => {
  //   console.log("target")
  //   console.log(`${value} ${name} ${type}`)
  //   setEmail(value)
  // }

  // const handleCheckboxChange = ({ target: { name, value, type, checked } }) => {
  //   console.log(`${name}, ${value}, ${type}, ${checked}`)
  //   setCheckboxes({ ...checkboxes, ...{ [value]: checked } })
  // }

  const handleSubmit = e => {
    e.preventDefault()

    setSubmitted(true)
  }

  const handleReset = e => {
    e.preventDefault()

    dispatch(initialState)

    setSubmitted(false)
  }

  return (
    <>
      {isSubmitted ? ( // result page
        <Layout>
          <SEO title="My Form" />
          <Result state={state} />
          <Button type="submit" onClick={handleReset}>
            Back
          </Button>
        </Layout>
      ) : (
        // input form
        <Layout>
          <SEO title="My Form" />
          <ValidatorForm
            className={classes.root}
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
            classes={classes.root}
          >
            <TextValidator
              label="Email"
              onChange={e => dispatch({ email: e.target.value })}
              name="email"
              value={state.email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextValidator
              label="Age"
              onChange={e => dispatch({ age: e.target.value })}
              name="age"
              value={state.age}
              validators={["required", "minNumber:0", "maxNumber:255"]}
              errorMessages={[
                "this field is required",
                "Age must be bigger than 0",
                "Age must be smaller than 255",
              ]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">(Years)</InputAdornment>
                ),
              }}
            />
            <SelectValidator
              label="Gender"
              onChange={e => dispatch({ gender: e.target.value })}
              name="gender"
              value={state.gender}
              validators={["required"]}
              errorMessages={["this field is required"]}
            >
              {genders.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </SelectValidator>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender2"
                value={state.gender2}
                onChange={e => dispatch({ gender2: e.target.value })}
                row
              >
                {genders.map(option => (
                  <FormControlLabel
                    key={option.label}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkboxes["checkboxA"]}
                    onChange={({ target }) =>
                      dispatch({
                        checkboxes: { [target.value]: target.checked },
                      })
                    }
                    value="checkboxA"
                  />
                }
                label="Secondary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkboxes["checkboxB"]}
                    onChange={({ target }) =>
                      dispatch({
                        checkboxes: { [target.value]: target.checked },
                      })
                    }
                    value="checkboxB"
                    color="primary"
                  />
                }
                label="Primary"
              />
              {error && <div className={classes.error}>{error}</div>}
            </FormGroup>
            <div>
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </div>
          </ValidatorForm>
        </Layout>
      )}
    </>
  )
}
