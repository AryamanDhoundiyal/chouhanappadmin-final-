// pages/Home.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server_url } from '../config';


const CBbuilder = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const designation = route.params?.designation;

  const handleProfileNavigation = () => {
    setMenuVisible(false);
    navigation.navigate('Profile');
  };

  const handleLogoutNavigation = async () => {
    setMenuVisible(false);
    try {
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem('authToken'); // Replace 'authToken' with the actual key used for storing the token
      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to remove token from AsyncStorage:', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>C.B builders</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleProfileNavigation}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogoutNavigation}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* Profile and Logout menu */}
        {menuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItems} onPress={handleProfileNavigation}>
              <Text style={styles.menuText}>View Profile</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.menuItems} onPress={handleLogoutNavigation}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>

      <View style={styles.menuWrapper}>
        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://wallpapercave.com/wp/wp12493260.jpg' }}
          />
          <TouchableOpacity
            style={styles.menuTouchable}
            onPress={() => navigation.navigate('HolidayList')}
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Add Holidays</Text>
              <Text style={styles.menuSubtitle}>Add public holidays only</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg' }}
          />
          <TouchableOpacity
            style={[
              styles.menuTouchable,
              designation === 'Manager' && styles.disabledTouchable // apply disabled style for Manager
            ]}
            onPress={() => {
              if (designation === 'Manager') {
                alert('Not available for Managers'); // show alert if clicked by Manager
              } else {
                navigation.navigate('AddEmployee'); // navigate to AddEmployee for other designations
              }
            }}
            disabled={designation === 'Manager'} // disable touchable for Manager
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Add Employee</Text>
              <Text style={styles.menuSubtitle}>Add employee for those who want to mark attendance</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>


        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?cs=srgb&dl=pexels-rebrand-cities-581004-1367276.jpg&fm=jpg' }}
          />
          <TouchableOpacity
            style={styles.menuTouchable}
            onPress={() => navigation.navigate('Notice')}
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Notice Board</Text>
              <Text style={styles.menuSubtitle}>Notices of Company</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://img.freepik.com/premium-vector/salary-vector-concept-online-income-calculate-automatic-payment-calendar-pay-date-employee-wages-concept_199064-1163.jpg' }}
          />
          <TouchableOpacity
            style={[
              styles.menuTouchable,
              designation === 'Manager' && styles.disabledTouchable // apply disabled style for Manager
            ]}
            onPress={() => {
              if (designation === 'Manager') {
                alert('Not available for Managers'); // show alert if clicked by Manager
              } else {
                navigation.navigate('List'); // navigate to List for other designations
              }
            }}
            disabled={designation === 'Manager'} // disable touchable for Manager
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>View Employee</Text>
              <Text style={styles.menuSubtitle}>Employees of organisation</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
  


        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://img.freepik.com/premium-vector/salary-vector-concept-online-income-calculate-automatic-payment-calendar-pay-date-employee-wages-concept_199064-1163.jpg' }}
          />
          <TouchableOpacity
            style={[
              styles.menuTouchable,
              designation === 'Manager' && styles.disabledTouchable // apply disabled style for Manager
            ]}
            onPress={() => {
              if (designation === 'Manager') {
                alert('Not available for Managers'); // show alert if clicked by Manager
              } else {
                navigation.navigate('ListEmp'); // proceed to ListEmp for other designations
              }
            }}
            disabled={designation === 'Manager'} // disable touchable for Manager
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Calculate Salary</Text>
              <Text style={styles.menuSubtitle}>Total salary of Employees</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://t3.ftcdn.net/jpg/04/69/79/70/360_F_469797034_i1FM7TbG567D73MjLNrNE0pFYPONlNeH.jpg' }}
          />
          <TouchableOpacity
            style={styles.menuTouchable}
            onPress={() => navigation.navigate('Employee')}
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>View Attendance</Text>
              <Text style={styles.menuSubtitle}>Check the attendance</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhAQEhMWFRUVGRcXFxgWFhUYFxYWGBcXFxYXFhkYHSggGR0lHRcXITEiJS0rLjAuGB8zODMvNygtLisBCgoKDg0OGxAQGyslICUrLS0uLS8vNS0tLS0tLy0tLS0tLS03LS0tLS0tLSstLS0tLy0tLS0tLS0tLS0tLS0tLf/AABEIAM4A9AMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQEEBgcIAwL/xABLEAABAwICAwkMBwYGAgMAAAABAAIDBBEFIRIxUQYHExVBYXGR0RQXIjJTVHOBkpOx0jRScqGyweEjM0KCw/AWVWKi0/Ek4ghDwv/EABsBAQADAQEBAQAAAAAAAAAAAAABAgMEBQYH/8QAMxEAAgECBAQEBQQDAAMAAAAAAAECAxEEEiExE0FRYQVxkbEigaHR8BQyUsFCcvEjYuH/2gAMAwEAAhEDEQA/AN4oiIAiIgCtJK9jTa9+jNWOL11jwbT9o/kvGOkAbdzgCW6Qbqy5Ln8l5tbHSdR06KTa3b2Xbl5b78jqhQWVSnz2RNQzNcLtN16rHKSUh7LcpAPOCsjW+DxPHg3azWhnWpcNhERdZiEREAREQBW9ZT8JHJHct02lt2mxFxa4O1XCItHcEbgWFimhZCHueG3zdrzN7DYM9SkkRWnOU5OUt3qQlZWCIiqSEREAREQBERAEREAREQBERAYzunx2SncxrGtII0iXA552sLEW/UKfp5NJjHWI0gDY6xcXsVWWJrraTQbZi4BsdoXssoQmpybldPZdDepUpypxjGFmr3d9/wDgREWyMDEGSB0t33sXG9stZV5XVLNBsbXaeifGOVhqDefp5lXFMIcHF8Y0gTctyuDy2vrCtKXC5nG2joDlLtfqC+UlQxNNzpKF3J79V57a2vrtfk3c9lSpTSnmsly7+/bTfuXOERact+RmZ6eQf3sWSK2oqRsTQxvrPKTtKuV72Bw3ApZXu9X+dkebiKvEndbcgiKBrcaOlox6hy2vf9FpicVSw8c1RlKVKVR2iTyKJgxFwOjK23P/AH+SllajXhWTceW6ejXmiJ05QeoREWxQIiIAiIgCIiAIiIAiIgCIo6pxuljcWSVELHDWHSMBHSCVaMJSdoq77C6W5Ioon/ElF53T++j7U/xJRed0/vo+1afpq38H6MjMupLIon/ElF53T++j7Ve0ldFKNKKRkg2sc1w+4qs6NSCvKLXmhdMuURFmSEREARF5yPDQXONgASSdQAzJKA9EWmd0m+fUPkc2lIijB8E6IL3Da7SBAvsAy2lQffBxHzl3sx/Kr5GRc6CRc+98HEfOXezH8qd8HEfOXezH8qZO4ub8maS1wGsggesLDoJS1wdytI17RtWtO+DiPnLvZj+VXeEbuHFx7pJJJvwgAv8AzNaNXOAvK8UwNSrGNSnvHkt/Nd019fk+7BVoRbhPZ8/v5m26qz2cITncWGnpDPXyXb0cyvcKkJZY8ht6lrz/ABhTMaXGRruZrrk/y61idTvh1pe4xSGJhOTAGGw5y5pJKy8PhVqVnUlHKrWd+b9F7WROKUYRy3vrp+am/kXPvfBxHzl3sx/KnfBxHzl3sx/KvaydzgudBItJYDuqr6nh9LEGw8HGXjhGxeHb+EZD89YyVKPdZXyUs9UcQax0TmgRObFpv0rZt8Hn2HxTqTJ3FzdyLSFXusr2UsFUMQa50rnNMLWxabLaWbvB1ZDkHjDWozvg4j5y72Y/lTJ3FzoJFz73wcR85d7Mfyp3wcR85d7Mfypk7i50Ei5974OI+cu9mP5U74OI+cu9mP5Uydxc6CRc+98HEfOXezF8qd8HEfOXezF8qZO4uZ5vy7qZKOmjihJbJUFw0hk5rGAaWieQnSaL8lzyrQ4xA7VKbtN0FRWGHuiQyaGno3DRbS0b+KB9UdSxsL7PwKnGGGTXO9/Vr+vc56j1JE4g5UOIO2rLcF3GQ1mFyVFM5zquFzjIwkWLNbdEWvm3MHlII6K71O5ls87quoFqal8Nxdqc5ubQeYW0j0Dau6eNpRhUm7/A7Nc78refJlcruu5EY7hlXRthdUM0OGaXsGkCbC19IDxT4QyO1em5jdFNTytlicQ4H1OHKCOUFeO7zdK7EKqSYk6A8GNvIGjlttJzP6KJw3WFpSU50UqyV2tVy15fLZ9yHvodaYfViWKKYapGNeOYOaD+aKz3JfQaL0MX4Ai/Oq9PLUlFbJv3OyOqJdY9W4y5ziyHIDIv13+ypevBMcob4xa63TZY1hIDXNJIbo56ic+cLxvEsRODhTg7Zt3/APXb3R3YSlBxlUkrtbL+/sSuH1cgcGyG97axYi+o9C+t15/8Gt9DJ+AqtLHwkmmL6I1XJOrkz51Tdj9BrfQyfhK6fD82TVtq+jera8+nQwxFs2is+ZzpDGHTRsOpz2tPQXAH4rdZ3r8N8nJ76TtWlqL6RD6SP8YXTpXoz3OdGGd6/DfJye+k7U71+G+Tk99J2rI6jEtF5Y1oNtZLg0X18q+eMX/UZ7xqsqU3/wBRXMjHu9fhvk5PfSdqd6/DfJye+k7VPuxJ4/gb6pAfgvjjd3kx7X6KeDUe3uvuQ6kVuQfevw3ycnvpO1O9fhvk5PfSdqnON3eTHtfonG7vJj2v0Tg1en1X3HEiQfevw3ycnvpO1O9fhvk5PfSdqnON3eTHtfonG7vJj2v0TgVen1X3HEiQXeuwzycnvn9qd67DPJye+f2qd43d5Me1+icbu8mPa/ROBV6fVfccWJBd67DPJye+f2qvevw3ycnvpO1TnG7vJj2v0Tjd3kx7X6JwKvT6r7jiRIPvX4b5OT30nanevw3ycnvpO1TnG7vJj2v0Tjd3kx7X6JwKvT6r7jiRIPvX4b5OT30nanevw3ycnvpO1TnG7vJj2v0Tjd3kx7X6JwKvT6r7jixIPvX4b5OT30nanevw3ycnvpO1TnG7vJj2v0X0zFzcXZlzO/RODU6fVDiRNH78u52lon0jKZrgXB7n6T3Oyu0M16tT1roLam+E5tbVVAOYDtCO2saHg3G250j61jtBvX4nNm2IBvI6Q8Hf1Oz6gvscG44PDQVR20vq+b1e/mZS+J6EbuL3TSYfUtnZ4TfFkZewe06x0jWDtCyndrvgwT0xo6CB0Ecji+YkNaXEm7hZpN7nWeayxfdJuOqaF7Ip9DSc3TGi7SFrkbNoXpuZ3C1dfwvc/Bng9HS0naPjaVrZZ+KVSpiPD6lVVpSV136bXXO3K4SklYxsq+wzWsz7zWJ7Ife/+qyTcdvPSslbJWvZoNIPBMJcX25HuIADdoF78y3n4xhIq+dfLVkcORtHcu3Ro6NpGYhi/AEUqMkXwtSWeblbdt+p1LRWPpWslDG52kW5/HpV0iznCM1aST89SVJrZny1oGQyCid2P0Gt9DJ+EqYUPux+g1voZPwlXW6KnO1F9Ih9JH+MLp0rmKi+kQ+kj/GF06Vee4RaT0DHkuNwTrtyr44qj5/u7FfJdFUmtmVyroWIwtnP93YnFjNrusdivrqt1PEqdRkj0LDixm13WOxOLGbXdY7FfXVbpxKnUZI9Cw4sZtd1jsTixm13WOxX11W6cSp1GSPQsOLGbXdY7E4sZtd1jsV/dUunEqdRkj0LHixm13WOxOLGbXdY7FdzS2F7L4pqgPAITiVLXuMkehb8WM2u6x2JxYza7rHYr6yqo4s+oyR6FhxYza7rHYnFjNrusdi+8SxKCnZwk8rImatJ7g0X2C+s8wWON3ysKLtDutt9pZKG+0WWW1OGJqK8Iya7Jv2DjBGQcWM2u6x2KrcNYDfM9J/Re1HWRTMbJE9sjHanMcHNPQQrgkLF1J7NjJHoWNBhUEN+CiYwnWQ0aR6Xayr1fDJgSRyhfSrJybvLcsaZ37/pdN6H+o9Se8Rqr+mH4SqM37/pdN6H+o9Se8Rqr+mH4Sqz/aOZthERZkhERAEREAUPux+g1voZPwlTCh92P0Gt9DJ+EqVugznai+kQ+kj/ABhdOlcxUX0iH0kf4wunSrz3IRa4lUGKGWVrHSFjHODG+M8tBIa3nOpa676FV/lNR/v/AONbQK+dJbYerSpp56al5tq3o0Vkm9mazh3zKpzmt4pqMyBlp3zPPHZTG63drPRz8DHQTTt0Q7TZpaJJvkLMOqyzTSXy+UN1kDpIC1deg5Jqira6Xlr33voRZ9TWffQqv8pqOt//ABqdoN2M8lFUVhoZWvicGtiOlpSA6PhNu0Gw0s8jqKy3uln12+0F9NeDmCDzgpUr0GlailqucvTV8wk+prPvoVX+U1H+/wD41d4NvhVM88MLsMnY2R7Wl507MBNi43YBYaznqC2B3Sz67faCo2dpyDgeghWliKDTXAS75pafUhJ/yMO3V7tZ6Ocwx0E07dFruEZpaJJvcCzDqUN30Kr/ACmo63/8a2Y+QN1kDpIC+e6WfXb7QUU69CMUnRTfW8tfR2JafUx/c1jslZBJLJTyU5a8sDZL3cAAdIXANs7epSGB+Kek/FXdS4FpIN+jNWmB+Kek/FYTlGWZxVlfbp6lkrEsVG45isdJTzVUviRNLjtJ1NaOcuIA6VJFYDv1F3Fb7auFj0vs3+bRTC0lVrQpvZtISdlc0ri+K1eK1bdIl0kjgyNg8VukbNaz6oHKfWVmtZvJzMhMjalrpQL8HoENJ+qHl33kdSwDcfiD6etpp2RukdG4O0WglzhqcABy2JW/8Q3Ys4EvbBVONsmdzTB19hu2w6b2X0/iNfEUJU4YdJRt0T57dvNWv1MYqL/caO3F7q58MqA4Fxj0rTRcjgDY5HU4ch5tl101TVLJY2SxnSY9oe0jla4Ag9RXI2IyufLK97dFznOc4EWsXEkix6V0xvauccLotLXwf3aR0fusuTxyjG0auz2ffS/06lqT5EvD+/H2XfkpNRcP78fZd+SlF89Pf5GqNMb9/wBLpvQ/1HqT3iNVf0w/CVRm/f8AS6b0P9R6k94jVX9MPwlT/EczbCIizJCIiAIiIAofdj9BrfQyfhKmFD7sfoNb6GT8JUrdBnO1F9Ih9JH+MLp0rmOj+kQ+kj/GF04Vee5CB5F8pM8NBcTYDWVGmqb5Z3sfokYt7EOSW5d17iI3kbFH1jA6U3+q1erXNf4Blcb8mja/Ney9Kp0QfdzrOsNQJy5L2C1heLt5/wBFJ2aLXuduxermgRSgZZBfRnh+ufZPYrLBMVZVNqHsb/4wOgyUn96W34RzW2yYDYA3zsctV9HmazWdla/r+ej6FFFHpFTtsMl6MhaCDZfbZofrn2T2L7iliJADj1Efkjk+5CS7HjXsBmz+qPiVTuduxXdWYg4Fxs4jkucvUOlefDw/WPsnsVYydla5aUdWUjaAxwC+cD8U9J+K9i5pYS03C8cD8U9J+KzlqmaR2JYqL3Q4Qyrpp6WTxZW2v9V2trh0OAPqUoV8KkW4tNbosap3raaHD5amkqQ2KsL8i7ISQ2GjwTjraSHHb1ZbQNQ219IdatMZwSmqmcHURMkA1aQzB2tOsHoWPO3t6LV+2LfqGeYs6LaS661aniJupNtN76XXy1Vuy5dSqTWhhe77C4MUr4IaSzpG5VErANBjbi2k4ZF+TrD+xtvD6NsMMcLBZsbWtaNjWgADqC8MJwWCmaGQxtY0cjQAOnnKkXKlfEcSMaavljtffz/pLkiUrakdD+/H2XfkpRRcX78fZd+SlFzz3+RJpjfv+l03of6j1J7xGqv6YfhKozfv+l03of6j1J7xGqv6YfhKn+I5m2ERFmSEREAREQBYfvh7paWnpqiCSQcLJG5rY25uu5pALreKOc2UbvnbuhQsMEJ/buFy7I8E06rD655NgzPIDp7c/ucrMWlc5pIZcl8r7kaR187nf2SvSwmBU48aq7R9/wA9XyKSlbREdxuGyNe0Alrg4X1eCQc+pZ/Bv4VF/DpYnD/S57T1nSWR4TvQUMbRw2nM7lLnFo9QZbLpuvSHe0wyojLmwujzc27ZH3yNr5kj7l158B/Btdfxop8R94bvp0NYzgn6VPIS2wktoOOkDlIMvasswjYLBaR3Y71M9K101M4zxDNzSP2rRtsMnjXqseZV3s98A0rm0tUS+B1gxxOcR5Mz/BzciiWDpypueGd1zXP87P1Id76m8Imi46QrLGKV0hmYyR0TyG6MjQCWkAEGzhYjaOUXV/BVsJHgOHPkR8V9VdRG19i0udbO2zkvmvOUmpbCytua1qZ8QrJRhU0QhA8KomjvoywXy4O+rTzFrnlysCFsKOmZHTujjaGsYA1rRqAFgAF9d2M8m7rHarmOdhjcS0ho1g/3mtq9dzUUo2S5Lm+b836JbEJLqWcTBYZL1a0K245g+qf79aMxqC4uCMwLnUL7c1m4z/izNVae2ZHtWD9sfsj819aA2L2rKljXAFpc618uQcma8e7GeTd93aqxbyrQ1aV3qejR4Ll54H4p6T8V7cIHMJAI5ivHA/FPSfis5ftZpHYlisVxvd7h9JK6Cee0jbaTQ2R+jfMAloIB5llRWpd129G6qqpqqKoawSu0y17CSHHxrEHMXz5ltg4YeU2sRJpW5dfR+xMr20Mi76uFecO9zL8qd9XCvOHe5l+VQNVvf4rLG6F+IxuY4aJbwIF27LgXX3Tbg8WjYyJmJMDGANaOC1NAsBmLrt4Xh9v3O/8As/fh/QreRN99TCvOHe5l+VTuAbpKWtY99LIJA02cLOa5pOq7XAHOxz5lg9VuDxaRj434kxzHgtcOC1tIsRkNimt7rcLxW2Yum4V8uiDZui1rW3sACbk3cc+hZV6eCVJunJ5tLK913veMLfUJyvqZJF+/H2XfkpRRcP78fZd+SlF509/kXNMb9/0um9D/AFHqT3iNVf0w/CVRm/f9LpvQ/wBR6k94jVX9MPwlT/EczbCIizJCIiAK0xKtbBFLO/JsbHPd0NBJ+Cu1iG+xOWYVWEfxCNnqfKxp+4laUocSpGHVperD2NCtE2K4g1jj4U8hc4j+Ea3EczWiw6AF0fgeFRU0McMTQ1rAAB27SdZK0lvJwtNXUTO/+uI9Rdcn/at64fWsmaXMJIBtmLZ2B9etet4nOWZQivhjbyu19tjKBdAKgYBkBZQ+7HHBQUk9VoaZjDQG3sC5zgxtzyC7rnoWNb2G76TEzNHNExj4g1wdHpaLgSRaziSCMuU3z1Wz8+NCpKm6qXwrf835ovmV7GduatC78u5NtLO2qhbaKe9wBkyYZm2wOGfSHLfjzYE7Fr/fSmiqcKqHtz4KSJwJFrOLg02/le7rXRgKkoVk1s2k/nsRJaFN6bHDVULGvN5IHcE4nWWixYfZNv5VmFUP2x6B+a1N/wDH6p0Za5h1FsTvWHPH/wCluYztOuyY1cPESSWn3SZRRui0slR+5m6FdcKzm6lUTt5ly5+wdO6tcwThBtHWviVwIsDcmwHWFm5ig8nH7LexVYyEG4YwHaGtB+C6/wBYv4s4v0D5y+h4VTf2v8rfzX1ZXZqG8ypwzeZcmfsdzhrc8G+K5eWB6j0n4r2qqhoac144H4vWoesWy6ViXKxbG93uH0kroJ57SNtpNDXv0b5gEtaQDzLIKiqDSAclqbddvX91VU1TFUtYJXaZa9pNnHxrEHMXz5lvgqVCc3x20raW6+j9iJNrYyvvpYXbS4d9r2vwUtr67X0da+nb52GDSBmeC3xrwy+DqGfg5ZkdawiPe1q2wClFfGIhKJQzgzYShuiH316uS9lczbhcQe6pe7EWF1S0MmPBD9o1oAAy1ZAarLueH8Ov++Xq+3/p5/mqreZlh308LFrzuzzH7KXMbR4KnMA3SUta176WQSBhs4Wc1zSdV2uAOdjnzFasxHe0q52wMlr43NhYI4wYyNFg1Ny19JzWV73e5JuFtnLpuFfLog2Gi1rW3sALkk3cc+hZYihgo0m6UpZum63/ANY8vsSnK+pl0P78fZd+Su6usazXr2dqjoJvDdKNTWkdLiRYKNlkL3En/tfOeJ4z9PaMd2vQ7MNQ4mr2LHdBhdNWytlnjLy1ug2znNAFyeQ5m5X1gdNFQmQ08WgJNHTF3OB0b21nLxipCCBzzotF/wAlcYhQGO5GbMhckXXiRxGMlF1U5WXnb7efQ7XTopqDSuyQw3GY5ToeK/6p5fsnlUosLihDXabRZ3IdnQsqoKjhGB3LqPSF6uAx3HvCW6+v/DkxGH4fxLYukRF6RyhYzvjUJnw2tjaLu4PTA2mMiSw9lZMvki+RVoScJKS5O/oGc47zWJCLEeDJsJmFo53izm/cHda6HaVzRu93PSYXXnQu1hdwtO8cgBuADtYcuo8q3Rvf7tIsQiDSQ2oaP2ke3/Wza0/dqXs+I0uIliIaxa17fnuZQdtGZVWUsczHxSsa9jxZzXC4I5wo7AtzdLRaYpohHp67Z39ZzUrdW9FWNlbptuBcjPaDZeWs6i0m7c+hoXJWvN+3EhHQCC/hTyNy/wBEfhuPtBg/mWbYriUVNE6ad4YxvKdZPI1o1uJ2Bc6bud0kmJVQLRYXEcbCRZrb5Ak5XJNydXqAXb4fQdSqp8o638vy76FZuyMz3h8GL2VlQ7xS5kbdYzaC534mra3FDdp6yobcYaKgo4KUVVOS0Xe4TR+FI7N58bVfIcwCm+P6Pzqn99H8y58ViXUrSlF6X08iYqysfPFDdp6ynFDdp6yvrj+j86p/fR/MnH9H51T++j+Zc/El1JPnihu09ZTihu09ZX1x/R+dU/vo/mTj+j86p/fR/MnEl1B88UN2nrKcUN2nrK+uP6Pzqn99H8ycf0fnVP76P5k4kuoKcUN/7JV7TU4YLBWfH9H51T++j+ZOP6Pzqn99H8yhzb3YL+WJrhZwBHOLrx7gi8m3qCtuP6Pzqn99H8ycf0fnVP76P5lF2tmC67gi8m3qCdwReTb1BWvH9H51T++j+ZOP6Pzqn99H8yZn1Bc9wReTb1BV7gi8m3qCteP6Pzqn99H8ycf0fnVP76P5kzPqBi7Q2IBoAF9QyGoqDZqCkcRxilewtbUwF3IBNGSTqsBfM5qNjOS+a8XTVZN9D1ME/gt3JDDKhrdNrrgPyuOTX2pV0Ja3Ta7SZzcnSvGk4PMSaWdrEcm1XdbI2NroGA8hcT6jl9yygozw/wD5LWinlafxJvWzW1nZvy5l3dVPhvrv0t1I1TO585SDnB6x+ihlPYLDox3P8Rv6tQ/vnU+FxbxCa5J+1v7GLaVMkkRF9OeSEVrUVscZAe9rS7VcgX6Lq6QhNMg91e5yCvgdBOMtbHjx43cjmn8uVc+bpNx1dhcnCWc6Npuyoh0gBsJIzYen1Erp4heMkF124THTw+m8ej/oiUUznvCd9+viAa8xzgcsrDp+00tv6wVc1G/LVBujDBTxa9THu15kgFwF77QVtfEd7/DpyXSU0dzrLRoE9JZZWUG9fhjDdtM0/ac946nuK7f1eBerp6/T3/orll1NBYxugq65+lLI+U/c0HkAGTR0WXnS0mhmQS7oOXQuoKbA442hkYDGjUGgNA9QXuMPHOssR4hxI8OCyx6L827L20ChbU5h0TsPUVTROw9S6h7iCdxBcGaJfU5esdh6ksdh6l1B3EE7iCZojU5fsdh6ksdh6l1B3EFTuIKc0RqcwWOw9SWOw9S6f7iCdxDYmaI1OYLHYepLHYepdP8AcQTuIJmiNTmCx2HqSx2HqXT/AHEFXuMJmiNTl+x2HqTROw9S6g7jCr3GFGaI1OXvUepU9X3LqPuIbFXuFuwdSZog5bvzfctkbkN2rHNbDVO0XjJsh8V45NM/wu5zkVtwULPqjqQ4ew/whc2Kw9HEQyTv2a3RpSqSpu6Mba4EXBuNoX1dT/FUexfTcMjHIvGfguulTT/XX3/s7v1yt+36kXh9FpkF+TdnKewLIQdi82U7RqC9QF6mHwtPDxyw+be7/Ohx1asqjuyqIi6DIxndLuZNVJHIJNHRyIIuLAk3HPmVkEMWi1rRmGgDPXkOVeyKzk2rGEMNThUlVivila762CIiqbhERAEREAREQFLJZVRAUsllVEBSyWVUQFLJZVRAUsllVEBSyWVUQFLKqIgCIiAj8YxRlMzTeCbmwAtcn1r7wuvZPG2Vl7G+R1gjIgpiOHRzs0JBcXuLGxB5ivqgo2QsbFGLNbq+JJPKbrJcTicstvnc3bo8G1nnv8rF2iItTAIiIAiIgCIiAIiIAiIgCIiAKL45i0tG+WrStl/0pCVlwRtBHWsUOHOMvBaQ1689S83xDE16LgqSTu+fXku1+p14WlTqXzvYy9FRVXpHIEREAREQBERAEREAREQBERAEREAREQBERAf/2Q==' }}
          />
          <TouchableOpacity
            style={styles.menuTouchable}
            onPress={() => navigation.navigate('Leave')}
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Leave Application</Text>
              <Text style={styles.menuSubtitle}>Employee taking leave</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuItem}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://media.istockphoto.com/id/1372036173/photo/hotel-lobby-with-employees-and-guests.jpg?s=612x612&w=0&k=20&c=t-Rzs6tZKO-HRHbCmQL_8hwyT-Dl3KuBNaF2U_cAx1Q=' }}
          />
          <TouchableOpacity
            style={styles.menuTouchable}
            onPress={() => navigation.navigate('EmpStatus')}
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Check In/Check Out</Text>
              <Text style={styles.menuSubtitle}>Employee In/Out Time</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>

        <View style={[styles.menuItem, { flex: 1, justifyContent: 'space-between' }]}>
          <Image
            style={styles.menuImage}
            source={{ uri: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg' }}
          />
          <TouchableOpacity
            style={[styles.menuTouchable, { flex: 1, justifyContent: 'space-between' }]}
            onPress={() => navigation.navigate('site')}
          >
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Add Site</Text>
              <Text style={styles.menuSubtitle}>Add new construction sites</Text>
            </View>
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  title: {
    fontSize: 24,
    color: '#4A235A',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  iconContainer: {
    cursor: 'pointer',
  },
  menuWrapper: {
    backgroundColor: '#68689E',
    borderRadius: 10,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1, // Add this line
  },
  menuImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#000',
    marginLeft: 10,
  },
  menuContainer: {
    position: 'absolute',
    right: 0,
    top: 40, // Adjust top position if needed
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 2, // Ensure the menu is on top of the white column
  },
  menuItems: {
    paddingVertical: 10,
  },
});

export default CBbuilder;
