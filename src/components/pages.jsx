import React, { useState, useEffect } from "react";

const Pages = ({ pageAmount, currentPage, setCurrentPage }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const newPages = new Set();

        newPages.add(1);

        if (pageAmount > 1) {
            newPages.add(2);
            newPages.add(pageAmount);
            newPages.add(pageAmount - 1);
        }
        if (pageAmount > 1) newPages.add(pageAmount);
        if (pageAmount > 2) newPages.add(pageAmount - 1);

        if (currentPage > 2 && currentPage < pageAmount - 1) {
            newPages.add(currentPage);
            newPages.add(currentPage - 1);
            newPages.add(currentPage + 1);
        }

        if (currentPage - 1 > 2 && currentPage - 1 < pageAmount - 1) {
            newPages.add(currentPage - 1);
        }
        if (currentPage + 1 > 2 && currentPage + 1 < pageAmount - 1) {
            newPages.add(currentPage + 1);
        }

        setPages([...newPages].sort((a, b) => a - b));
        // console.log('pages',pages);
    }, [currentPage, pageAmount]);

    const switchPage = (e) => {
        if (e.target.tagName === "P" && e.target.textContent !== "<" && e.target.textContent !== ">") {
            const value = Number(e.target.textContent);
            setCurrentPage(value);
        }
    };

    return (
        <div className="pages" onClick={switchPage}>
            <p className="prev page" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>{"<"}</p>

            {pages.map((page, i, arr) => {
                if (i > 0 && arr[i] - arr[i - 1] > 1) {
                    return (
                        <span key={page} className="span">
                        <span className="page omit">
                            ...
                        </span>
                        <span  onClick={() => setCurrentPage(page)} className={page === currentPage ? "page current" : "page"}>{page}</span>
                        </span>

                    );
                }
                return (
                    <p
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "page current" : "page" }
                    >
                        {arr[i]}
                    </p>
                );
            })}
            <p className="next page" onClick={() => currentPage < pageAmount && setCurrentPage(currentPage + 1)}>{">"}</p>
        </div>
    );
};

export default Pages;


