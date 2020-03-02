import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import {generateKey} from './helpers';

export default function App () {
  const [ goal, setGoal ] = useState('');
  const [ courseGoals, updateCourseGoals ] = useState([]);

  const onBtnPress = () => {
    updateCourseGoals( currentGoals => [...currentGoals, {
      ololoKey: generateKey(),
      value: goal
    }]);
    setGoal('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.textBtnWrapper}>
        <TextInput 
          style={styles.textInput}
          placeholder='Add your goals'
          value={goal}
          onChangeText={ goal => setGoal(goal)}
        />
        <Button   
          title='ADD' 
          style={styles.addButton}
          onPress={ onBtnPress }
        />
      </View>
      {/** ScrollView is really inefficient */}
      {/* <ScrollView>
        {courseGoals
          .map( goal => (
            <View style={styles.goalsList}>
              <Text key={goal}>{goal}</Text>
            </View>
          ))
          .reverse()
        } 
      </ScrollView> */}
      <FlatList 
        data={courseGoals} 
        keyExtractor={ (item, i) => item.ololoKey}      // itemData.item.key is taken by default
        renderItem={itemData => (
          <View style={styles.goalsList}>
            <Text>{itemData.item.value}</Text>
          </View>
        )}
      />
    </View>
  )
}

// This way of styling includes 
// 1) Performance Optimizations 😏
// 2) Style Validations
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ff8',
    paddingHorizontal: 20
  },
  textBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 100
  },
  textInput: {
    paddingHorizontal: 20,
    height: 40, 
    borderColor: 'gray', 
    width: '70%', 
    borderWidth: 1
  },
  addButton: {
    color: 'yellow',
    marginTop: 30,
    backgroundColor: 'blue'
  },
  goalsList: {
    padding: 10,
    backgroundColor: 'purple',
    borderWidth: 1,
    borderColor: 'purple',
    marginVertical: 10,
  }
})