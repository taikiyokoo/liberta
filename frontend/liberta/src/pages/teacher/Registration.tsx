import { makeStyles, Theme } from '@material-ui/core'
import { Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SelectChangeEvent } from '@mui/material';
import { TeacherProfileCreateParams } from 'interfaces';
import { createTeacherProfile } from 'pages/api/teacher';
import { useRouter } from 'next/router';
import { AuthContext } from 'pages/_app';

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

  const {currentUser} = useContext(AuthContext)

const router = useRouter()

const classes = useStyles()

const ageList = Array.from(Array(19).keys()).map((age) => age + 12);

const subjects:string[] = [
  '数学',
  '理科',
  '社会',
  '英語',
  '国語',
];

const [gender,setGender] =useState<string>("")
const [selectedSubjects,setSelectedSubjects] = useState<string[]>([])
const [university,setUniversity] = useState<string>("")
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

const handleGenderChange =(event:SelectChangeEvent)=>{
    setGender(event.target.value)
}

const handleAgeChange =(event:SelectChangeEvent) =>{
  setAge(event.target.value)
}

const handleSubmit =async(e: React.MouseEvent<HTMLButtonElement>)=>{

  e.preventDefault();

  const params:TeacherProfileCreateParams = {
    gender: gender,
    university: university,
    age: parseInt(age),
    subjects: selectedSubjects,
    user_id: currentUser?.id
  }

try{
    const res = await createTeacherProfile(params)

    router.push("/teacher/Home")


}catch(e){
  console.log(e)
    
}
    
}

  return (
    <div className={classes.container}>
      <form noValidate autoComplete='off' >
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="先生詳細登録"/>
          <CardContent>
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
                    <MenuItem value="male">男</MenuItem>
                    <MenuItem value="female">女</MenuItem>
                </Select>
            </FormControl>
            <TextField
                variant='outlined'
                required
                fullWidth
                label= "大学名"
                type="university"
                placeholder='学校名を入力してください'
                value={university}
                margin="dense"
                autoComplete='current-password'
                onChange={event => setUniversity(event.target.value) }
                />
                <Typography variant="body2" sx={{marginTop: 3}}>
                    指導可能教科
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
                disabled={!gender || !university || !gender ? true : false}
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

