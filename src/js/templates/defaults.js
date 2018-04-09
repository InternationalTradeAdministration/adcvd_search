import React from 'react';

export const defaults = {
  ResultItem: ({ id, snippet, title, url }) => (
    <article className="mi-result__item">
      <header className="title">
        <a href={ url } dangerouslySetInnerHTML={ { __html: title } }></a>
      </header>
      <p className="url"><a href={ url }>{ url }</a></p>
    </article>
  )
};
