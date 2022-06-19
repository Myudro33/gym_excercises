import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { fetchData, exerciseOptions } from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimularExercises from '../components/SimularExercises'
import { youtubeOptions } from '../utils/fetchData'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const { id } = useParams()
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises,setTargetMuscleExercises] = useState([])
  const [equipmentExercises,setEquipmentExercises] = useState([])



  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDburl = 'https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

      const exerciseDetailData = await fetchData(`${exerciseDburl}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exerciseDetailData)

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideosData.contents)

      const targetMuscleExercisesData = await fetchData(`${exerciseDburl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions)
      setTargetMuscleExercises(targetMuscleExercisesData)

      const equipmentExercisesData = await fetchData(`${exerciseDburl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
       setEquipmentExercises(equipmentExercisesData)
    }
    fetchExercisesData()
  }, [id])



  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimularExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail