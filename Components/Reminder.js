import * as React from 'react';
import { Searchbar, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Platform,
  UIManager,
  Button,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'; 


export class Reminder extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldShow: true,
      subject: '',
      value: '',
      data: [],
      listOfItems: [],
      isVisible: false,
      mode: 'date',
      show: false,
      chosenDate: '',
    };
  }
 handlePicker = (datetime) => {
     this.setState({
         isVisible: false,
         chosenDate: moment(datetime). format('MM/DD/YYYY HH:mm')

     })
 }

 hidePicker = () => {
     this.setState({
         isVisible: false,
     })
 }

 showMode = (curr) => {
     this.setState({
         show: true,
         mode: curr
     })
 }

 showDatePicker = () => {
     this.setState({
         isVisible: true
     })
     this.showMode('date')
 }

 
 showTimePicker = () => {
     this.setState({
         isVisible: true
     })
     this.showMode('time')
 }

  addItem = () => {
    if (this.state.value != '') {
      // create a new item with unique id
      const valueJSON = {
        id: 1 + Math.random(),
        value: this.state.value.slice(),
        chosenDate: this.state.chosenDate.slice()
      };

      // copy current list of items
      const list = this.state.listOfItems;

      // add the new item to the list
      list.push(valueJSON);

      // update state with new list, reset the new item input
      this.setState({
        listOfItems: list,
        //listOfItems:[...this.state.listOfItems,list],
        value: '',
        chosenDate: '24/11/2021 13:30'
      });
    }
  }; //add item

  deleteItem(id) {
    //get all the list items
    const list = this.state.listOfItems;
    //filter the list and create another list which is basically list - item to be deleted
    const updatedList = list.filter((item) => item.id !== id);
    //now set the state with updated list
    this.setState({
      listOfItems: updatedList,
    });
  }

  updateItem(key, value) {
   
   // update react state
    this.setState({
      [key]: value,
    });
  }

  addReminer = () => {};

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#5f6169' }}>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 35, margin: 10 }}>
           Task Reminder{' '}
          </Text>

          {/* {shouldShow ? ( <Text style={styles.text}> 
      Looks like you've no reminder
      </Text>
     ) : null } */}

          <Text style={styles.text}>Click + to add a reminder</Text>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ value: text })}
              value={this.state.value} onSubmitEditing={Keyboard.dismiss}></TextInput>

              {/* DATE TIME PICKER */}
            <TouchableOpacity onPress={this.showDatePicker}>
              <Ionicons
                name="calendar"
                size={20}
                style={{ color: 'black', marginTop: 20, margin: 8 }}
              />
            </TouchableOpacity>

            
            <TouchableOpacity onPress={this.showTimePicker}>
              <Ionicons
                name="time"
                size={20}
                style={{ color: 'black', marginTop: 20, }}
              />
            </TouchableOpacity>

            { this.state.show && <DateTimePicker
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode={this.state.mode}
                is24Hour={false}
            />
            }

          </View>

          <TouchableOpacity onPress={this.addItem} onPressIn={Keyboard.dismiss}>
            <Ionicons name="add" size={50} style={{ color: 'black' }} />
          </TouchableOpacity>

          {/* --------------------------- */}
          <TextInput />
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 27}}> Today's Reminder </Text>

        <ScrollView>
          {this.state.listOfItems.map((item, index) => {
            return (
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {' '}
                  Reminder {index + 1}{' '}
                </Text>
                <Card
                  style={{
                    padding: 10,
                    margin: 15,
                    backgroundColor: '#9da0a6',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignSelf: 'flex-start',
                      }}>
                      {item.value}
                    </Text>

                    <View
                      style={{
                        alignContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.updateItem(item.id, item.value);
                        }}>
                        <Ionicons
                          name="pencil"
                          size={30}
                          style={{ color: 'black' }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          this.deleteItem(item.id);
                        }}>
                        <Ionicons
                          name="trash"
                          size={30}
                          style={{ color: 'black' }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                   <Text> {item.chosenDate}</Text>
                </Card>
              </View>
            );
          })}
        </ScrollView>
        {/* <Button title="Add" onPress={()=> {}} /> */}
{/*           
  <Card style={{ padding: 10, margin: 15, backgroundColor: '#9da0a6' }}>
                        <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
                         <Text
                            style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start' }} >
                           Sleep
                            </Text>

                            <View style={{alignContent: 'space-between', flexDirection:'row'}}>
                             <TouchableOpacity
                            onPress={ ()=> {} }
                            >
                            <Ionicons name="pencil" size={30} style={{ color: 'black'}} />
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={ ()=> {} }>
                            <Ionicons name="trash" size={30} style={{ color: 'black', }} />
                            </TouchableOpacity>
                            </View>
                           
                        </View>
                        <Text> {this.state.chosenDate}</Text>
                    </Card> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    margin: 4,
  },
  input: {
    height: 40,
    width: 250,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 16,
    color: 'black',
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
  },
});
