import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

describe("TODOアプリ", () => {
  it("コンポーネントが正常にレンダリングされる", () => {
    render(<Home />);

    // タイトルが表示されているか確認
    expect(screen.getByText("TODOリスト")).toBeInTheDocument();

    // 入力フィールドが表示されているか確認
    expect(screen.getByPlaceholderText("新しいタスクを入力...")).toBeInTheDocument();

    // 追加ボタンが表示されているか確認
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();

    // 初期状態でタスクがないメッセージが表示されているか確認
    expect(
      screen.getByText("タスクがありません。新しいタスクを追加してください。")
    ).toBeInTheDocument();
  });

  it("タスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // タスクを入力して追加
    await user.type(input, "テストタスク1");
    await user.click(addButton);

    // タスクが表示されているか確認
    expect(screen.getByText("テストタスク1")).toBeInTheDocument();

    // 入力フィールドがクリアされているか確認
    expect(input).toHaveValue("");

    // タスク数が表示されているか確認
    expect(screen.getByText(/全タスク: 1/)).toBeInTheDocument();
  });

  it("複数のタスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // 3つのタスクを追加
    await user.type(input, "タスク1");
    await user.click(addButton);

    await user.type(input, "タスク2");
    await user.click(addButton);

    await user.type(input, "タスク3");
    await user.click(addButton);

    // 全てのタスクが表示されているか確認
    expect(screen.getByText("タスク1")).toBeInTheDocument();
    expect(screen.getByText("タスク2")).toBeInTheDocument();
    expect(screen.getByText("タスク3")).toBeInTheDocument();

    // タスク数が正しいか確認
    expect(screen.getByText(/全タスク: 3/)).toBeInTheDocument();
  });

  it("Enterキーでタスクを追加できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");

    // Enterキーでタスクを追加
    await user.type(input, "Enterで追加{Enter}");

    // タスクが表示されているか確認
    expect(screen.getByText("Enterで追加")).toBeInTheDocument();
  });

  it("空のタスクは追加できない", async () => {
    const user = userEvent.setup();

    // アラートをモック
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Home />);

    const addButton = screen.getByRole("button", { name: "追加" });

    // 空の状態で追加ボタンをクリック
    await user.click(addButton);

    // アラートが表示されたか確認
    expect(alertMock).toHaveBeenCalledWith("タスクを入力してください");

    // タスクが追加されていないか確認
    expect(
      screen.getByText("タスクがありません。新しいタスクを追加してください。")
    ).toBeInTheDocument();

    alertMock.mockRestore();
  });

  it("スペースのみのタスクは追加できない", async () => {
    const user = userEvent.setup();

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // スペースのみを入力
    await user.type(input, "   ");
    await user.click(addButton);

    // アラートが表示されたか確認
    expect(alertMock).toHaveBeenCalledWith("タスクを入力してください");

    alertMock.mockRestore();
  });

  it("タスクを削除できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // タスクを追加
    await user.type(input, "削除するタスク");
    await user.click(addButton);

    // タスクが追加されたことを確認
    expect(screen.getByText("削除するタスク")).toBeInTheDocument();

    // 削除ボタンをクリック
    const deleteButton = screen.getByRole("button", { name: "削除" });
    await user.click(deleteButton);

    // タスクが削除されたことを確認
    expect(screen.queryByText("削除するタスク")).not.toBeInTheDocument();

    // 空のメッセージが表示されることを確認
    expect(
      screen.getByText("タスクがありません。新しいタスクを追加してください。")
    ).toBeInTheDocument();
  });

  it("タスクの完了状態を切り替えられる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // タスクを追加
    await user.type(input, "完了するタスク");
    await user.click(addButton);

    const checkbox = screen.getByRole("checkbox");

    // 初期状態ではチェックされていない
    expect(checkbox).not.toBeChecked();

    // 完了数が0であることを確認
    expect(screen.getByText(/完了: 0/)).toBeInTheDocument();

    // チェックボックスをクリックして完了状態にする
    await user.click(checkbox);

    // チェックされていることを確認
    expect(checkbox).toBeChecked();

    // 完了数が1になることを確認
    expect(screen.getByText(/完了: 1/)).toBeInTheDocument();

    // もう一度クリックして未完了に戻す
    await user.click(checkbox);

    // チェックが外れていることを確認
    expect(checkbox).not.toBeChecked();

    // 完了数が0に戻ることを確認
    expect(screen.getByText(/完了: 0/)).toBeInTheDocument();
  });

  it("複数のタスクの完了状態を個別に管理できる", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // 2つのタスクを追加
    await user.type(input, "タスクA");
    await user.click(addButton);

    await user.type(input, "タスクB");
    await user.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");

    // 最初のタスクを完了にする
    await user.click(checkboxes[0]);

    // 1つ目がチェックされ、2つ目がチェックされていないことを確認
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();

    // 完了数が1であることを確認
    expect(screen.getByText(/全タスク: 2.*完了: 1/)).toBeInTheDocument();
  });

  it("タスク数と完了数が正しく表示される", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText("新しいタスクを入力...");
    const addButton = screen.getByRole("button", { name: "追加" });

    // 3つのタスクを追加
    await user.type(input, "タスク1");
    await user.click(addButton);

    await user.type(input, "タスク2");
    await user.click(addButton);

    await user.type(input, "タスク3");
    await user.click(addButton);

    // タスク数が正しいか確認
    expect(screen.getByText(/全タスク: 3.*完了: 0/)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");

    // 2つを完了にする
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    // 完了数が正しいか確認
    expect(screen.getByText(/全タスク: 3.*完了: 2/)).toBeInTheDocument();
  });
});
