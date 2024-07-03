import { faker } from '@faker-js/faker';

export interface Article {
  id: string;
  title: string;
  author: string;
  articleText: string;
  articleImage: string;
  dateAdded: string;
}

const generateArticle = (): Article => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(15),
  author: faker.person.fullName(),
  articleText: faker.lorem.sentences(20),
  articleImage: faker.image.urlPicsumPhotos(),
  dateAdded: faker.date.past().toLocaleDateString('en-US'),
});

const generateArticles = (count: number) =>
  Array.from({ length: count }).map(() => generateArticle());

export default generateArticles(100);
