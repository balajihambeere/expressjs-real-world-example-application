import * as filesystem from "../util/filesystem";

class TopicModel {
    id: string;
    title: string;
    slug: string;
    path: string;
    constructor(id: string, title: string, slug: string, path: string) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.path = path;
    }
}

class LessonModel {
    id: string;
    title: string;
    topics: Array<TopicModel>;
    constructor(id: string, title: string, topics: Array<TopicModel>) {
        this.id = id;
        this.title = title;
        this.topics = topics;
    }
}

class CourseModel {
    category: string;
    title: string;
    slug: string;
    author: string;
    id: string;
    fee: string;
    level: string;
    objectives: string;
    courseOutlines: Array<LessonModel>;

    constructor(category: string, title: string, slug: string, author: string,
        id: string, fee: string, level: string, objectives: string,
        courseOutlines: Array<LessonModel>) {
        this.category = category;
        this.title = title;
        this.slug = slug;
        this.author = author;
        this.id = id;
        this.fee = fee;
        this.level = level;
        this.objectives = objectives;
        this.courseOutlines = courseOutlines;
    }
}

export let loadCourseById = (id: string) => {
    const obj_array = filesystem.readJSONFile("./data_base/courses.json", undefined);
    for (const element of obj_array) {
        if (element.id == id) {
            // load objective via path and parse to marked
            const objectives = filesystem.readFile(element.objectives, undefined);
            // load courseOutline via path
            const courseOutline = getLessonsByCourseId(element.id, element.pathToLessons, element.pathToTopics);
            const item = new CourseModel(
                element.category, element.title, element.slug, element.author,
                element.id, element.fee, element.level, objectives,
                courseOutline);
            return item; // return course model
        }
    }
};


export let loadCourseBySlug = (id: string, slug: string) => {
    let objectives = "";
    const obj_array = filesystem.readJSONFile("./data_base/courses.json", undefined);
    for (const element of obj_array) {
        if (element.id == id) {
            // load courseOutline via path
            const courseOutline = getLessonsByCourseId(element.id, element.pathToLessons, element.pathToTopics);
            for (const outLine of courseOutline) {
                for (const topic of outLine.topics) {
                    // load objective via path and parse to marked
                    if (topic.slug == slug) {
                        objectives = filesystem.readFile(topic.path, undefined);
                    }
                }
            }
            const item = new CourseModel(
                element.category, element.title, element.slug, element.author,
                element.id, element.fee, element.level, objectives,
                courseOutline);
            return item; // return course model
        }
    }
};

export let getTopicsByLessonId = (id: string, path: string) => {
    const array = [];
    const obj_array = filesystem.readJSONFile(path, undefined);
    for (const topic of obj_array) {
        if (topic.id == id) {
            array.push(new TopicModel(topic.id, topic.title, topic.slug, topic.path));
        }
    }
    return array.length ? array : [];
};

export let getLessonsByCourseId = (id: string, pathLessons: string, pathTopics: string) => {
    const array = [];
    const obj_array = filesystem.readJSONFile(pathLessons, undefined);
    for (const element of obj_array) {
        if (element.courseId == id) {
            const topics = getTopicsByLessonId(element.id, pathTopics);
            array.push(new LessonModel(element.id, element.title, topics));
        }
    }
    return array.length ? array : [];
};


export let loadCourseDetails = (slug: string) => {
    // load all course data
    const courseCollection = filesystem.readJSONFile("./data_base/courses.json", undefined);
    // loop through the collection and return the course which matched with slug
    for (const element of courseCollection) {
        if (element.slug === slug) {
            // load objective via path and parse to marked
            const objectives = filesystem.readFile(element.objectives, undefined);
            // load courseOutline via path
            const courseOutline = getLessonsByCourseId(element.id, element.pathToLessons, element.pathToTopics);
            const item = new CourseModel(
                element.category, element.title, element.slug, element.author,
                element.id, element.fee, element.level, objectives,
                courseOutline);
            return item; // return course model
        }
    }
};