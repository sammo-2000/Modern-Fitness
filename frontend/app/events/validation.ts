interface EventData{
    name: string | null;
    description: string | null;
    time: string | null;
    capacity: number | null;
    date: string | null;
    trainers: Trainer[];
    url: string | null;
    alt: string | null;
}

interface Trainer {
    _id: string;
    name: string;
}

export const validateEventData = ({name, description, time, capacity, date, trainers, url, alt}:EventData): {valid: boolean, error: string} => {
// Some Frontend validation to reduce load on backend
if (!name) {
    return {valid: false, error: "Name is required"};
}
if (!description) {
    return {valid: false, error: "Description is required"};
}
if (!time) {
    return {valid: false, error: "Time is required"};
}
if (!capacity) {
    return {valid: false, error: "Capacity is required"};
}
if (!date) {
    return {valid: false, error: "Date is required"};
}
if (!trainers) {
    return {valid: false, error: "Trainers are required"};
}
if (!url) {
    return {valid: false, error: "Image url is required"};
}
if (!alt) {
    return {valid: false, error: "Image description is required"};
}

// Name
if (name.length < 5 || name.length > 20) {
    return {valid: false, error: "Name must be between 5 and 20 characters"};
}
if (!/^[a-zA-Z0-9\s]*$/.test(name)) {
    return {valid: false, error: "Name must only contain letters and numbers"};
}

// description
if (description.length < 10 || description.length > 200) {
    return {valid: false, error: "Description must be between 10 and 200 characters"};
}
if (!/^[a-zA-Z0-9\s]*$/.test(description)) {
    return {valid: false, error: "Description must only contain letters and numbers"};
}

// // Trainers
if (trainers.length === 0) {
    return {valid: false, error: "At least one trainer is required"};
}

// // Alt
if (alt.length < 2 || alt.length > 40) {
    return {valid: false, error: "Image description must be between 2 and 40 characters"};
}

return {valid: true, error: ""};
};