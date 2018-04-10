
exports.pagination = function (page,reqitem,total_items)  {

       var ans = db.pool
       current_page = page || 1
       items_per_page = reqitem;

       start_index = (current_page - 1) * items_per_page
       total_pages = Math.ceil(total_items / items_per_page)

   this.pageresponse = {

                       Total_items: total_items,
                       Total_pages: total_pages,
                       Start_index: start_index,
                       Items_per_page: items_per_page

                    }
                    
      return this.pageresponse;
 };