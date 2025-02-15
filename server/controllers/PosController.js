const mysql = require('mysql');
const router = require('../routes/PosSystem');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

//View Items POS
exports.OrderTransactionPage = (req,res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toDateString();

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT emp_firstname, emp_id from employee WHERE employee.position = "Admin" AND employee.status = "active" ',[req.params.id],(err,emp) => {
            // When done with the connection, release it
            connection.query('SELECT category_name, category_id FROM category',[req.params.id],(err,cat) => {
                connection.query('SELECT brand_name, brand_id FROM brand ',[req.params.id],(err,brand) => {
                    connection.query('SELECT company_name, supp_id FROM supplier WHERE status = "active" ',[req.params.id],(err,supp) => {

            connection.release();

            if(!err){
                res.render('PAGE-POS-Trans',{admin_list:emp,supplier_list:supp,cat_list:cat,brand_list:brand,date:today});

            } 

            else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', emp);
            //console.log('The data from user table: \n', rows2);
    
    
                  });
            });
        });
    });
       
    });


    };

exports.OrderTransactionPage_post = (req,res) => {
        const {encoded_by} = req.body;
      
          pool.getConnection((err,connection) => {
              if(err) throw err; //not connected!
              console.log('Connected as ID' + " " + connection.threadId)
          
              let searchTerm = req.body.search;
              
              //User the connection
              connection.query('INSERT INTO order_transaction SET encoded_by = ?', [encoded_by],(err,rows) => {
      
                  // When done with the connection, release it
                  connection.release()
          
                  if(!err){
                      res.render('PAGE-POS-Trans',{alert: 'Stock added successfully.'});
                      res.redirect('/POSPage');
                  } else{
                      console.log(err);
                  }
          
                  console.log('The data from user table: \n', rows);
                  console.log(encoded_by);
          
          
              });
          });
          
      
      }

/*exports.POSPage = (req,res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toDateString();
        //Connect to DB
        pool.getConnection((err,connection) => {
            if(err) throw err; //not connected!
            console.log('Connected as ID' + " " + connection.threadId)
            //User the connection
            connection.query('SELECT item_id, item_name,item.category_id,category_name,brand.brand_id,brand_name,description,quantity,price,stock,supp_id,emp_id, DATE_FORMAT(datein,"%m-%d-%Y") as datein FROM item,category,brand WHERE category.category_id = item.category_id AND brand.brand_id = item.brand_id GROUP BY item_id',(err,rows) => {
                connection.query('SELECT stockin_trans_id,supplier, company_name, address FROM stockin_transaction, supplier WHERE stockin_trans_id = (SELECT stockin_trans_id FROM stockin_transaction ORDER BY stockin_trans_id DESC LIMIT 1) AND supplier = supp_id',(err,ref) => {

                // When done with the connection, release it
                connection.release();
            
    
                if(!err){
    
                res.render('PAGE-POS', {rows,reference_num:ref,date:today});
               
                    }
                    else{
                    console.log(err);
                }
                console.log(ref); 
                //console.log('The data from user table: \n', rows);
        
        
            });
        });
    });
    
 };
*/
exports.get_order_entry = (req,res) => {
        //Connect to DB
       
        pool.getConnection((err,connection) => {
            if(err) throw err; //not connected!
            console.log('Connected as ID' + " " + connection.threadId)
            //User the connection
            connection.query('SELECT item_id, item_name,item.category_id,category_name,brand.brand_id,brand_name,description,quantity,price,stock,supp_id,emp_id, DATE_FORMAT(datein,"%m-%d-%Y") as datein FROM item,category,brand WHERE category.category_id = item.category_id AND brand.brand_id = item.brand_id AND stock>0  GROUP BY item_id',(err,rows) => {
                connection.query('SELECT order_trans_id,encoded_by, emp_firstname, emp_lastname FROM order_transaction, employee WHERE order_trans_id = (SELECT order_trans_id FROM order_transaction ORDER BY order_trans_id DESC LIMIT 1) AND encoded_by = emp_id',(err,trans) => {

                // When done with the connection, release it
                connection.release();
            
    
                if(!err){
    
                res.render('PAGE-order-entry', {rows,transaction_num:trans});
               
                    }
                    else{
                    console.log(err);
                }
            
                //console.log('The data from user table: \n', rows);
        
            });
            });
        });
    
 };

 exports.add_each_item = (req,res) => {
    let add = req.body.add;
    console.log("ADD"+add);
    //Connect to DB
    pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
    
    
    //User the connection
    //connection.query('UPDATE order_cart SET new_stock_added = new_stock_added-1 WHERE item_id = ?',[req.params.id],(err,rows) => {
    // When done with the connection, release it
    connection.release()
    
    if(!err){
        res.render('PAGE-order-entry');
        res.redirect('/OrderEntry');
    } 
    
    else{
        console.log(err);
    }
    
    //console.log('The data from user table: \n', rows);
    //console.log('Hi');
    
    
    });
   // });
    
    
    };
 exports.add_each_item = (req,res) => {
    let add = req.body.add;
    console.log("ADD"+add);
    //Connect to DB
    pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
    
    
    //User the connection
    //connection.query('UPDATE order_cart SET new_stock_added = new_stock_added-1 WHERE item_id = ?',[req.params.id],(err,rows) => {
    // When done with the connection, release it
    connection.release()
    
    if(!err){
        res.render('PAGE-order-entry');
        res.redirect('/OrderEntry');
    } 
    
    else{
        console.log(err);
    }
    
    //console.log('The data from user table: \n', rows);
    //console.log('Hi');
    
    
    });
   // });
    
    
    };

 exports.add_multiple_item = (req,res) => {
    const {new_stock_added} = req.body;
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        
                //User the connection
        connection.query("INSERT INTO order_cart(item_id,old_stock,new_stock_added,total) SELECT item.item_id,stock,quantity,final_price FROM item WHERE item.item_id = ?",[ req.params.id],(err,rows) => {

                    // When done with the connection, release it
                        //connection.release();
            if(!err){
                res.redirect('/OrderEntry');
                            
                     }
             else{
                 console.log(err);
                                res.redirect('/OrderEntry');
                            }
                     
           
                    
                    console.log('The data from user table2: \n', rows);
                    console.log(err);
                    
            
                });
            });
 
         }; 


exports.find_item = (req,res) => {

            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected!
                console.log('Connected as ID' + " " + connection.threadId)
            
                let searchTerm = req.body.search;
            
                //User the connection
                connection.query('SELECT item_id, item_name,item.category_id,category_name,brand.brand_id,brand_name,description,quantity,final_price,price,stock,supp_id,emp_id, DATE_FORMAT(datein,"%m-%d-%Y") as datein FROM item,category,brand WHERE category.category_id = item.category_id AND brand.brand_id = item.brand_id AND (item_name LIKE ? OR brand_name LIKE ? OR category_name LIKE ?) Group by item_id  ', ['%' + searchTerm + '%','%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows) => {
                    connection.query('SELECT stockin_trans_id,supplier, company_name, address FROM stockin_transaction, supplier WHERE stockin_trans_id = (SELECT stockin_trans_id FROM stockin_transaction ORDER BY order_trans_id DESC LIMIT 1) AND supplier = supp_id',(err,ref) => {

                    // When done with the connection, release it
                    connection.release();
            
                    if(!err){
                        res.render('PAGE-order-entry', {rows,reference_num:ref});
                       // res.redirect('/StockInEntry');
                    } else{
                        console.log(err);
                    }
            
                    console.log('The data from user table: \n', rows);
                });
        
                });
            });
            }
       
exports.POSPage = (req,res) => { 
    //Connect to DB
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toDateString();
    const{butt} = req.body;   
    pool.getConnection((err,connection) => {
          if(err) throw err; //not connected!
              console.log('Connected as ID' + " " + connection.threadId)
                    //User the connection
               connection.query('SELECT * FROM order_cart',(err,rows) => {
                        // When done with the connection, release it
                     if(!err){
                           
                  }
                 connection.query('ALTER IGNORE TABLE order_cart ADD UNIQUE INDEX u(item_id)',(err,rows) => {
                            // When done with the connection, release it
                    if(!err){
            
                              
                     }
                 connection.query('SELECT order_cart.item_id,item_name,item.brand_id,brand_name,category.category_id,category_name,description,quantity,price,final_price,total,order_cart.old_stock,item.emp_id,new_stock_added FROM item,order_cart,category,brand WHERE item.item_id = order_cart.item_id AND item.category_id = category.category_id  AND item.brand_id = brand.brand_id',(err,rows) => {
                                // When done with the connection, release it
    
                  if(!err){
                                  
            ///////////////////////////////NOT SURE BUT IT WORKS
                 connection.query('SELECT * FROM item WHERE item_id = 1 ',[req.params.id],(err,rows3) => {
                 connection.query('SELECT order_trans_id,emp_firstname FROM order_transaction, employee WHERE order_trans_id = (SELECT order_trans_id FROM order_transaction ORDER BY order_trans_id DESC LIMIT 1) AND encoded_by = emp_id',(err,ref) => {
                        connection.query('SELECT order_trans_id,amount_received, amount_change,encoded_by, emp_firstname, emp_lastname FROM order_transaction, employee WHERE order_trans_id = (SELECT order_trans_id FROM order_transaction ORDER BY order_trans_id DESC LIMIT 1) AND encoded_by = emp_id',(err,trans) => {           
                            connection.query('SELECT cast(SUM(total) as decimal(10, 2)) as total FROM order_cart ',(err,total) => {           

                    connection.release();
                    if(!err){
                         res.render('PAGE-POS', {rows,submit:rows3,transaction_num:trans, alert: `Successfully updated`,date:today,total:total});
                        console.log(ref);
            
                         }
            
                        else{
                          console.log(err);
                            }                        
                                
                             });
                                     
                            });
                        });
                 
                    });              
                     }  else{
            
                        console.log('error');
                        res.redirect('/OrderEntryCart');
                            
                    }
                    
                console.log('HI The data from user table: \n', rows);
                //console.log('Hello')
                
                
    
             });
            });
         });
        //console.log('The data from user table: \n', rowss);
      });
            
     
                
     
  };

exports.add_all_order_entry = (req,res) => {
    const{supplier,stock,item_id,employee,received} = req.body;                
    
    
pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
    //User the connection
    console.log("EMP"+employee);
   
    //connection.query('UPDATE order_cart SET supplier_id = ?, ref_num = ?, emp_id = ? ',[supplier, employee, req.params.id],(err,rows) => {
        // When done with the connection, release it
        //connection.release();
        connection.query('SELECT order_trans_id FROM order_transaction ORDER BY order_trans_id DESC LIMIT 1',(err,ref) => {
       
           
         connection.query('INSERT INTO order_entry(order_trans_id,item_id,new_stock_added) SELECT order_trans_id, order_cart.item_id,(order_cart.new_stock_added) as new_stock FROM order_transaction,order_cart,item WHERE order_trans_id = (SELECT order_trans_id FROM order_transaction ORDER BY order_trans_id DESC LIMIT 1) AND item.item_id = order_cart.item_id ',[],(err,rows) => {

            connection.query('UPDATE item i, order_cart o SET i.stock = (o.old_stock-o.new_stock_added)  WHERE i.item_id = o.item_id',[item_id, req.params.id],(err,rows) => {
            

         connection.query('DELETE FROM order_cart',[req.params.id],(err,rows) => {

        
        if(!err){

            pool.getConnection((err,connection) => {
                if(err) throw err; //not connected!
                console.log('Connected as ID' + " " + connection.threadId)
                //User the connection
                connection.query('SELECT * FROM order_cart ',[req.params.id],(err,rows) => {
                        if(!err){
                            res.render('PAGE-POS',{rows,alert2: `Successfully Added`,modal_message:'HI'});
                            res.redirect('/OrderTransaction');

                            
                        }
            
                        else{
                        console.log(err);
                    }
            
                    console.log('The data from user table: \n', rows);          
            
              });
           });
            

        } else{
            console.log(err);
        }

        console.log('The data from user table: \n', rows);

        console.log('idd \n', stock);
        
    });
    });
});
});
});


//});



    }

exports.amn_received = (req,res) => {
        const{supplier,stock,item_id,employee,received} = req.body;                
        
        
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        console.log("EMP"+employee);
       
        //connection.query('UPDATE order_cart SET supplier_id = ?, ref_num = ?, emp_id = ? ',[supplier, employee, req.params.id],(err,rows) => {
            // When done with the connection, release it
            //connection.release();           
            connection.query('UPDATE order_transaction SET total_due = (SELECT SUM(total) as total FROM order_cart ORDER BY order_trans_id DESC LIMIT 1)  ORDER BY order_trans_id DESC LIMIT 1',[req.params.id],(err,rows) => {         

            connection.query('UPDATE order_transaction SET amount_received = ? ORDER BY order_trans_id DESC LIMIT 1',[received,req.params.id],(err,rows) => {         
                connection.query('UPDATE order_transaction SET amount_change = (amount_received-total_due) ORDER BY order_trans_id DESC LIMIT 1',[req.params.id],(err,rows) => {         

            if(!err){
    
                pool.getConnection((err,connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + " " + connection.threadId)
                    //User the connection
                    connection.query('SELECT * FROM order_transaction ',[req.params.id],(err,rows) => {
                            if(!err){
                                res.render('PAGE-POS',{rows,alert2: `Successfully Added`,modal_message:'HI'});
                                res.redirect('/POSPage');
    
                                
                            }
                
                            else{
                            console.log(err);
                        }
                
                        console.log('The data from user table: \n', rows);          
                
                  });
               });
                
    
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
            console.log('idd \n', stock);
        });  
    }); 
        });
        }); 
    
        }

//Delete 
exports.delete_all_order_entry = (req,res) => {

//Connect to DB
pool.getConnection((err,connection) => {
if(err) throw err; //not connected!
console.log('Connected as ID' + " " + connection.threadId)


//User the connection
connection.query('DELETE FROM order_cart WHERE item_id = ?',[req.params.id],(err,rows) => {
// When done with the connection, release it
connection.release()

if(!err){
    res.redirect('/POSPage');
} 

else{
    console.log(err);
}

console.log('The data from user table: \n', rows);
//console.log('Hi');


});
});


};
exports.add_order_entry = (req,res) => {

    //Connect to DB
    pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
    
    
    //User the connection
    connection.query('UPDATE order_cart,item SET new_stock_added = (new_stock_added+1),total = item.final_price*order_cart.new_stock_added WHERE item.item_id = order_cart.item_id AND new_stock_added<old_stock AND order_cart.item_id = ?',[req.params.id],(err,rows) => {

    // When done with the connection, release it
    connection.release()
    
    if(!err){
        res.redirect('/POSPage');
       
        
    } 
    
    else{
        console.log(err);
    }
    
    //console.log('Hi');
    
});
});
  
    };
exports.minus_order_entry = (req,res) => {

        //Connect to DB
        pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        
        
        //User the connection
        connection.query('UPDATE order_cart,item SET new_stock_added = (new_stock_added-1),total = item.final_price*order_cart.new_stock_added WHERE new_stock_added > 0 AND item.item_id = order_cart.item_id AND order_cart.item_id = ?',[req.params.id],(err,rows) => {
        // When done with the connection, release it
        connection.release()
        
        if(!err){
            res.redirect('/POSPage');
        } 
        
        else{
            console.log(err);
        }
        
        console.log('The data from user table: \n', rows);
        //console.log('Hi');
        
        
        });
        });
        
        
        };




        