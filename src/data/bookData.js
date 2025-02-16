class BookData {
  constructor(
    {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    },
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = finished;
    this.reading = reading;
    this.insertedAt = insertedAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = BookData;
