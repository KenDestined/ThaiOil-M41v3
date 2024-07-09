global class CTRBlockSupplierBatchScheduler implements Schedulable {
    global void execute(SchedulableContext sc) {
        CTRBlockSupplierBatch batch = new CTRBlockSupplierBatch();
        Database.executeBatch(batch);
    }
}