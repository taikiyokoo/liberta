import { makeStyles, Theme } from '@material-ui/core'
import { Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { SelectChangeEvent } from '@mui/material';
import { Container } from '@mui/system';
import { createStudentProfile } from 'pages/api/student';
import { StudentProfileCreateParams } from 'interfaces';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
      marginTop: theme.spacing(6)
    },
    submitBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      textTransform: "none"
    },
    header: {
      textAlign: "center"
    },
    card: {
      padding: theme.spacing(2),
      maxWidth: 400
    },
    box: {
      marginTop: "2rem"
    },
    link: {
      textDecoration: "none"
    }
  }))
  

const registration:React.FC = () => {

const classes = useStyles()
const router = useRouter()

const ageList = Array.from(Array(19).keys()).map((age) => age + 12);

const subjects:string[] = [
  '数学',
  '理科',
  '社会',
  '英語',
  '国語',
];

const [gender,setGender] =useState<string>("")
const [grade,setGrade] =useState<string>("")
const [selectedSubjects,setSelectedSubjects] = useState<string[]>([])
const [school,setSchool] = useState<string>("")
const [age,setAge] = useState<string>("")

const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedSubject = event.target.value;
  const selectedIndex = selectedSubjects.indexOf(selectedSubject);
  let newSelectedSubjects = [];

  if (selectedIndex === -1) {
    newSelectedSubjects = [...selectedSubjects, selectedSubject];
  } else {
    newSelectedSubjects = selectedSubjects.filter((subject) => subject !== selectedSubject);
  }

  setSelectedSubjects(newSelectedSubjects);
};


const handleGradeChange =(event:SelectChangeEvent)=>{
    setGrade(event.target.value)
}
const handleGenderChange =(event:SelectChangeEvent)=>{
    setGender(event.target.value)
}

const handleAgeChange =(event:SelectChangeEvent) =>{
  setAge(event.target.value)
}

const handleSubmit =async(e: React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();

  const params:StudentProfileCreateParams = {
    gender: parseInt(gender), 
    grade: parseInt(grade),
    age: parseInt(age),
    school: school,
    subjects: selectedSubjects
  }

try{
    const res = await createStudentProfile(params)

    if(res.status === 200){
      router.push('/student/Home')
      

    }else{
      
    }


}catch(e){
  console.log(e)
    
}

}

  return (
    <div className={classes.container}>
      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="生徒詳細登録"/>
          <CardContent>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">学年</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grade}
                label="grade"
                onChange={handleGradeChange}
            >
                <MenuItem value={1}>中学１年</MenuItem>
                <MenuItem value={2}>中学２年</MenuItem>
                <MenuItem value={3}>中学３年</MenuItem>
                <MenuItem value={4}>高校１年</MenuItem>
                <MenuItem value={5}>高校２年</MenuItem>
                <MenuItem value={6}>高校３年</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{minWidth: 120}}>
          <InputLabel id="age-label">年齢</InputLabel>
          <Select labelId="age-label" id="age-select" value={age} onChange={handleAgeChange}>
            {ageList.map((age) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{minWidth: 120}}>
        <InputLabel id="demo-simple-select-label">性別</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="gender"
                onChange={handleGenderChange}
            >
                <MenuItem value={1}>男</MenuItem>
                <MenuItem value={2}>女</MenuItem>
            </Select>
        </FormControl>
        <TextField
              variant='outlined'
              required
              fullWidth
              label= "学校名"
              type="school"
              placeholder='学校名を入力してください'
              value={school}
              margin="dense"
              autoComplete='current-password'
              onChange={event => setSchool(event.target.value) }
            />
            <Typography variant="body2" gutterBottom>
                希望教科
              </Typography>
              {subjects.map((subject) => (
                <FormControlLabel
                  key={subject}
                  control={<Checkbox checked={selectedSubjects.indexOf(subject) !== -1} onChange={handleSubjectChange} value={subject} />}
                  label={subject}
                />
              ))}

            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              disabled={!gender || !school || !gender ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              この内容で登録する
            </Button>
          </CardContent>

        </Card>

    </form>
      
    </div>
  )
}

export default registration
