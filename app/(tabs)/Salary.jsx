import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { server_url } from '../config';

const EmployeeProfile = () => {
    const [employeeUsername, setEmployeeUsername] = useState('');
    const [totalSalary, setTotalSalary] = useState('');
    const [advances, setAdvances] = useState([{ amount: '', date: '', reason: '' }]);
    const [bonuses, setBonuses] = useState([{ amount: '', date: '', reason: '' }]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentDateField, setCurrentDateField] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const { employeeUsername } = route.params;
        setEmployeeUsername(employeeUsername || '');
    }, [route.params]);

    const calculateFinalSalary = () => {
        const totalAdvances = advances.reduce((sum, advance) => sum + parseFloat(advance.amount || '0'), 0);
        const totalBonuses = bonuses.reduce((sum, bonus) => sum + parseFloat(bonus.amount || '0'), 0);
        const salary = parseFloat(totalSalary);
        return (isNaN(salary) ? 0 : salary) - totalAdvances + totalBonuses;
    };

    const addAdvance = () => {
        setAdvances([...advances, { amount: '', date: '', reason: '' }]);
    };

    const addBonus = () => {
        setBonuses([...bonuses, { amount: '', date: '', reason: '' }]);
    };

    const saveChanges = async () => {
        try {
            const finalSalary = calculateFinalSalary();
            const advanceTakenAmount = advances.reduce((sum, advance) => sum + parseFloat(advance.amount || '0'), 0);
            const advanceTakenDates = advances.map(a => a.date || '');
            const bonusAmount = bonuses.reduce((sum, bonus) => sum + parseFloat(bonus.amount || '0'), 0);
            const bonusDates = bonuses.map(b => b.date || '');
            const advanceReasons = advances.map(a => a.reason || ''); // Ensure reason is included
            const bonusReasons = bonuses.map(b => b.reason || ''); // Ensure reason is included

            await axios.post(`${server_url}/Salary/${employeeUsername}`, {
                employee_username: employeeUsername || '',
                total_salary: totalSalary || '0',
                advance_taken_amount: advanceTakenAmount,
                advance_taken_date: advanceTakenDates,
                bonus_amount: bonusAmount,
                bonus_date: bonusDates,
                final_salary: finalSalary,
                advance_reason: advanceReasons, // Ensure reason is included
                bonus_reason: bonusReasons, // Ensure reason is included
            });

            navigation.navigate('Page', { advances, bonuses });
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleDateSelect = (date) => {
        if (currentDateField === 'advance') {
            const newAdvances = [...advances];
            newAdvances[advances.length - 1].date = date;
            setAdvances(newAdvances);
        } else if (currentDateField === 'bonus') {
            const newBonuses = [...bonuses];
            newBonuses[bonuses.length - 1].date = date;
            setBonuses(newBonuses);
        }
        setShowCalendar(false);
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getMonthStartDay = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarDays = (month, year) => {
        const monthStartDay = getMonthStartDay(month, year);
        const daysInMonth = getDaysInMonth(month, year);
        const daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        return Array.from({ length: monthStartDay }).concat(daysOfMonth);
    };

    const Calendar = ({ isVisible, onDateSelect, onClose }) => {
        const [selectedDate, setSelectedDate] = useState(null);
        const days = generateCalendarDays(currentMonth, currentYear);

        const handlePrevYear = () => {
            setCurrentYear((prev) => prev - 1);
        };

        const handleNextYear = () => {
            setCurrentYear((prev) => prev + 1);
        };

        const handlePrevMonth = () => {
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
            if (currentMonth === 0) {
                handlePrevYear();
            }
        };

        const handleNextMonth = () => {
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
            if (currentMonth === 11) {
                handleNextYear();
            }
        };

        return (
            <Modal transparent visible={isVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.calendarContainer}>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity onPress={handlePrevYear}>
                                <Text style={styles.navButton}>«</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePrevMonth}>
                                <Text style={styles.navButton}>‹</Text>
                            </TouchableOpacity>
                            <Text style={styles.monthYearText}>
                                {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </Text>
                            <TouchableOpacity onPress={handleNextMonth}>
                                <Text style={styles.navButton}>›</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNextYear}>
                                <Text style={styles.navButton}>»</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.daysOfWeekContainer}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
                            ))}
                        </View>
                        <FlatList
                            data={days}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dayButton}
                                    onPress={() => {
                                        if (item) {
                                            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(item).padStart(2, '0')}`;
                                            setSelectedDate(date);
                                            onDateSelect(date);
                                        }
                                    }}
                                >
                                    <Text style={[styles.dayText, item ? styles.validDayText : styles.emptyDayText]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            numColumns={7}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer} />
            <View style={styles.detailsContainer}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        value={employeeUsername}
                        onChangeText={setEmployeeUsername}
                        placeholder="Enter Employee Username"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Total Salary:</Text>
                    <TextInput
                        style={styles.input}
                        value={totalSalary}
                        onChangeText={setTotalSalary}
                        keyboardType="numeric"
                    />
                </View>
                {advances.map((advance, index) => (
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.label}>Advance Taken (Date: {advance.date}):</Text>
                        <TextInput
                            style={styles.input}
                            value={advance.amount}
                            onChangeText={(text) => {
                                const newAdvances = [...advances];
                                newAdvances[index].amount = text;
                                setAdvances(newAdvances);
                            }}
                            keyboardType="numeric"
                            placeholder="Enter Advance Amount"
                        />
                        <TextInput
                            style={styles.input}
                            value={advance.reason}
                            onChangeText={(text) => {
                                const newAdvances = [...advances];
                                newAdvances[index].reason = text;
                                setAdvances(newAdvances);
                            }}
                            placeholder="Enter Reason"
                        />
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                setCurrentDateField('advance');
                                setShowCalendar(true);
                            }}
                        >
                            <Text style={styles.inputText}>{advance.date || 'Select Date'}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={addAdvance}>
                    <Text style={styles.buttonText}>Add Another Advance</Text>
                </TouchableOpacity>
                {bonuses.map((bonus, index) => (
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.label}>Bonus (Date: {bonus.date}):</Text>
                        <TextInput
                            style={styles.input}
                            value={bonus.amount}
                            onChangeText={(text) => {
                                const newBonuses = [...bonuses];
                                newBonuses[index].amount = text;
                                setBonuses(newBonuses);
                            }}
                            keyboardType="numeric"
                            placeholder="Enter Bonus Amount"
                        />
                        <TextInput
                            style={styles.input}
                            value={bonus.reason}
                            onChangeText={(text) => {
                                const newBonuses = [...bonuses];
                                newBonuses[index].reason = text;
                                setBonuses(newBonuses);
                            }}
                            placeholder="Enter Reason"
                        />
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => {
                                setCurrentDateField('bonus');
                                setShowCalendar(true);
                            }}
                        >
                            <Text style={styles.inputText}>{bonus.date || 'Select Date'}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={addBonus}>
                    <Text style={styles.buttonText}>Add Another Bonus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={saveChanges}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
            <Calendar
                isVisible={showCalendar}
                onDateSelect={handleDateSelect}
                onClose={() => setShowCalendar(false)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileContainer: {
        marginBottom: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    fieldContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    inputText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    saveButtonText: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
    },
    
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    calendarContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    navButton: {
        fontSize: 18,
        color: '#007BFF',
    },
    monthYearText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    daysOfWeekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayOfWeekText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    dayButton: {
        width: '14%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    dayText: {
        fontSize: 14,
        textAlign: 'center',
    },
    validDayText: {
        color: '#000',
    },
    emptyDayText: {
        color: 'transparent',
    },
    closeButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#007BFF',
        borderRadius: 4,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default EmployeeProfile;
